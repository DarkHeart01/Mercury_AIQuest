import React, { useState } from "react";
import { SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-feed";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Paperclip, Mic, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [query, setQuery] = useState("");

  const suggestions = [
    "suggestion 1",
    "suggestion 2",
    "suggestion 3",
  ];

  const handleSend = () => {
    console.log("Query sent:", query);
    setQuery(""); // Clear the input after sending
  };

  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">What can I help you with?</h1>
      </div>
      
      {/* Chat Input Area */}
      <form className="relative rounded-lg border bg-card-foreground focus-within:ring-1 focus-within:ring-ring p-1 w-full max-w-md">
        <ChatInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query..."
          className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
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

          <Button 
            size="sm" 
            className="ml-auto gap-1.5"
            onClick={handleSend}
          >
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>

      {/* Suggestions */}
      <div className="mt-4 flex gap-2">
        {suggestions.map((suggestion, index) => (
          <Button 
            key={index} 
            variant="ghost" 
            className="px-4 py-2 text-sm"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
    </SidebarProvider>
  );
}
