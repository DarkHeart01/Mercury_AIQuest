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
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GitTalk = () => {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text: "What are you?",
      sender: "user",
    },
    {
      id: 2,
      text: "I'm GitTalk!",
      sender: "bot",
    },
  ]);

  const [inputValue, setInputValue] = React.useState("");
  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const [repoLoading, setRepoLoading] = useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  // Fetch the list of GitHub repositories from the API on component mount
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("http://65.1.43.251/api/upload/github");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error("Failed to fetch repositories", err);
      } finally {
        setRepoLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputValue.trim() || !selectedRepo) return;

    // Add the user message to the chat
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const queryPayload = {
        query: `With reference to ${selectedRepo.repoName} repo, ${inputValue}`,
      };

      // Send the message to the API
      const response = await axios.post(
        `http://65.1.43.251/api/talk/repo/${selectedRepo.id}`,
        queryPayload
      );

      const data = response.data;

      // Add the AI response to the chat
      const botMessage = {
        id: messages.length + 2,
        text: data.ans || "I couldn't process your request.",
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        id: messages.length + 2,
        text: "There was an error connecting to the server. Please try again later.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-row w-full items-center justify-center">
        <div className="flex flex-col h-screen w-[65%] mx-auto bg-background shadow-lg rounded-lg">
          {/* Chat Message List */}
          <ChatMessageList>
            {messages.map((message: any) => {
              const variant = message.sender === "user" ? "sent" : "received";
              return (
                <ChatBubble key={message.id} variant={variant}>
                  <ChatBubbleAvatar fallback={variant === "sent" ? "US" : "AI"} />
                  <ChatBubbleMessage
                    isLoading={message.isLoading}
                    className={message.sender === "user" ? "bg-sky-400" : ""}
                  >
                    <ReactMarkdown
                      className="markdown-content"
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={`inline-code ${className}`} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </ChatBubbleMessage>
                </ChatBubble>
              );
            })}
          </ChatMessageList>

          {/* Chat Input */}
          <form
            className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
            onSubmit={handleSendMessage}
          >
            <ChatInput
              placeholder="Type your message here..."
              className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex items-center p-3 pt-0">
              {/* Repository Selector Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-2">
                    {selectedRepo ? selectedRepo.repoName : "Select a Repo"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {repoLoading ? (
                    <DropdownMenuItem className="text-sm text-muted">
                      Loading repositories...
                    </DropdownMenuItem>
                  ) : (
                    repos.map((repo) => (
                      <DropdownMenuItem
                        key={repo.id}
                        onClick={() => setSelectedRepo(repo)}
                        className="cursor-pointer bg-[#252525]"
                      >
                        {repo.repoName}
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

export default GitTalk;
