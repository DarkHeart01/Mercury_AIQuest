import * as React from "react";
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-feed";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Forward, Heart } from "lucide-react";
import { CornerDownLeft, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
    ChatBubbleAction,
    ChatBubbleActionWrapper,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import MessageLoading from "@/components/ui/chat/message-loading";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
    id: number;
    text: string;
    sender: string;
    isLoading?: boolean; // Optional property
}

const ShareBase = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "What are you?",
            sender: "user",
        },
        {
            id: 2,
            text: "I'm ShareBase!",
            sender: "bot",
        },
    ]);

    const [inputValue, setInputValue] = useState("");
    const [files, setFiles] = useState<any[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [selectedFileID, setSelectedFileID] = useState<number | null>(null);
    const [fileLoading, setFileLoading] = useState(true);
    const [, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Message loading state

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/upload/wiki`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setFiles(data);
            } catch (err) {
                setError("Failed to fetch files. Please try again.");
            } finally {
                setFileLoading(false);
            }
        };
        fetchFiles();
    }, []);

    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            sender: "user",
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputValue("");
        setIsLoading(true);

        setTimeout(async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/talk/wiki?query=${encodeURIComponent(inputValue)}`,
                    { fileID: selectedFileID }
                );

                const data = response.data.data;

                const botMessage: Message = {
                    id: messages.length + 2,
                    text: data.answer || "I couldn't process your request.",
                    sender: "bot",
                };

                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                const errorMessage: Message = {
                    id: messages.length + 2,
                    text: "There was an error connecting to the server. Please try again later.",
                    sender: "bot",
                };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        }, 3000);
    };

    const actionIcons = [
        { icon: DotsVerticalIcon, type: "More" },
        { icon: Forward, type: "Share" },
        { icon: Heart, type: "Like" },
    ];

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-row w-full items-center justify-center">
                <div className="flex flex-col h-screen w-[65%] mx-auto bg-background shadow-lg rounded-lg page-container">
                    <ChatMessageList>
                        {messages.map((message) => {
                            const variant = message.sender === "user" ? "sent" : "received";
                            return (
                                <ChatBubble key={message.id} variant={variant} className="chat-bubble-enter">
                                    <ChatBubbleAvatar fallback={variant === "sent" ? "US" : "AI"} />
                                    <ChatBubbleMessage
                                        isLoading={message.isLoading}
                                        className={message.sender === "user" ? "bg-sky-400" : ""}
                                    >
                                        <ReactMarkdown
                                            className="markdown-content"
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            {message.text}
                                        </ReactMarkdown>
                                    </ChatBubbleMessage>
                                    <ChatBubbleActionWrapper className="chat-action-icons">
                                        {actionIcons.map(({ icon: Icon, type }) => (
                                            <ChatBubbleAction
                                                className="size-7"
                                                key={type}
                                                icon={<Icon className="size-4" />}
                                                onClick={() =>
                                                    console.log(`Action ${type} clicked for message ${message.id}`)
                                                }
                                            />
                                        ))}
                                    </ChatBubbleActionWrapper>
                                </ChatBubble>
                            );
                        })}
                        {isLoading && <MessageLoading />}
                    </ChatMessageList>

                    <form
                        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1 chat-input-container"
                        onSubmit={handleSendMessage}
                    >
                        <ChatInput
                            placeholder="Type your message here..."
                            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div className="flex items-center p-3 pt-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="ml-2">
                                        {selectedFile ? selectedFile : "Select a File"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {fileLoading ? (
                                        <DropdownMenuItem className="text-sm text-muted">
                                            Loading files...
                                        </DropdownMenuItem>
                                    ) : (
                                        files.map((file) => (
                                            <DropdownMenuItem
                                                key={file.id}
                                                onClick={() => {
                                                    console.log('selecting')
                                                    setSelectedFile(file.wikiUrl);
                                                    setSelectedFileID(file.id);
                                                }}
                                                className="cursor-pointer bg-[#252525]"
                                            >
                                                {file.wikiUrl}
                                            </DropdownMenuItem>
                                        ))
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="ghost" size="icon">
                                <Mic className="size-4" />
                                <span className="sr-only">Use Microphone</span>
                            </Button>
                            <Button size="sm" className="ml-auto gap-1.5" type="submit">
                                Send Message
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default ShareBase;


