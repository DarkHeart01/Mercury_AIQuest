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
import MessageLoading from "@/components/ui/chat/message-loading";
import axios from "axios";

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
  const [isLoading, setIsLoading] = React.useState(false);

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
    setIsLoading(true);

    try {
      // Send the message to the API
      const response = await axios.post(
        `http://65.1.43.251/api/talk/docs?query=${encodeURIComponent(inputValue)}`
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
          {messages.map((message: any, index) => {
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
                          "Action " + type + " clicked for message " + index
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
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

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
    </SidebarProvider>
  );
};

export default DocSense;
