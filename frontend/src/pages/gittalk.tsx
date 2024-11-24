import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-feed";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Forward, Heart } from "lucide-react";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
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

const GitTalk = () => {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text: "What are you?",
      sender: "user",
    },
    {
      id: 2,
      text: "Hi! I am your AI assistant.",
      sender: "bot",
    },
  ]);

  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputValue.trim()) return;

    // Add the user's message to the chat
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the API with the user's input
      const response = await fetch("http://65.1.43.251/api/talk/repo/2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputValue }),
      });

      const data = await response.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.ans || "I'm sorry, I couldn't process that.",
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "There was an error connecting to the server. Please try again.",
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const actionIcons = [
    { icon: DotsVerticalIcon, type: "More" },
    { icon: Forward, type: "Share" },
    { icon: Heart, type: "Like" },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col h-screen w-full max-w-lg mx-auto bg-background shadow-lg rounded-lg">
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
                  {message.text}
                </ChatBubbleMessage>
                {/* Action Icons */}
                <ChatBubbleActionWrapper>
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
        </ChatMessageList>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
          <ChatInput
            placeholder="Type your message here..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex items-center p-3 pt-0">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>

            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </SidebarProvider>
  );
};

export default GitTalk;
