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

const DocSense = () => {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text: "What are you?",
      sender: "user",
    },
    {
      id: 2,
      text: "I'm DocSense!",
      sender: "bot",
    },
  ]);

  const [inputValue, setInputValue] = React.useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileLoading, setFileLoading] = useState(true); // Loading indicator for files
  const [, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false); // Message loading state

  // Fetch the list of files from the API on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/upload/files`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
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

    // Add the user message to the chat
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true); // Start loading

    // Simulate a 5-second delay for loading
    setTimeout(async () => {
      try {
        const queryWithPrefix = `With reference to ${selectedFile} file ${inputValue}`;

        // Send the message to the API
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/talk/docs?query=${encodeURIComponent(queryWithPrefix)}`
        );

        const data = response.data;

        // Add the AI response to the chat
        const botMessage = {
          id: messages.length + 2,
          text: data.answer || "I couldn't process your request.",
          sender: "bot",
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        const errorMessage = {
          id: messages.length + 2,
          text: "There was an error connecting to the server. Please try again later.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false); // Stop loading after the delay
      }
    }, 3000); // 3-second delay
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
          {/* Chat Message List */}
          <ChatMessageList>
            {messages.map((message: any) => {
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
                      remarkPlugins={[remarkGfm]} // Optional: GitHub flavored Markdown
                    >
                      {message.text}
                    </ReactMarkdown>
                  </ChatBubbleMessage>
                  {/* Action Icons */}
                  <ChatBubbleActionWrapper className="chat-action-icons">
                    {actionIcons.map(({ icon: Icon, type }) => (
                      <ChatBubbleAction
                        className="size-7"
                        key={type}
                        icon={<Icon className="size-4" />}
                        onClick={() =>
                          console.log(
                            `Action ${type} clicked for message ${message.id}`
                          )
                        }
                      />
                    ))}
                  </ChatBubbleActionWrapper>
                </ChatBubble>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <MessageLoading />
            )}
          </ChatMessageList>

          {/* Chat Input */}
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
              {/* File Selector Dropdown */}
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
                        onClick={() => setSelectedFile(file.fileName)}
                        className="cursor-pointer bg-[#252525]"
                      >
                        {file.fileName}
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

export default DocSense;


