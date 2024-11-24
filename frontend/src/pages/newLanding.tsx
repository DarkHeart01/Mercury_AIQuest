import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-feed";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Paperclip, Mic, CornerDownLeft } from "lucide-react";
import Logo from "@/images/MERCAI.png";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!query.trim()) return; // Prevent empty queries

    setLoading(true);
    setResults([]);
    setAiSuggestion("");
    setError(null);

    try {
      const response = await fetch(
        `http://65.1.43.251/api/query/search?search=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      setResults(data.results.queries || []);
      setAiSuggestion(data.aiSuggestion || "No suggestion provided.");
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
      setQuery(""); // Clear the input after sending
    }
  };

  return (
    <>
      <AppSidebar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background text-foreground">

        {/* Logo Section */}
        <div className="absolute top-2 w-full flex justify-center">
          <img src={Logo} alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Main Header */}
        <div className="text-center mb-6 mt-20">
          <h1 className="text-2xl font-bold">What can I help you with?</h1>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="border border-solid border-red-500 text-white px-4 py-2 rounded-full text-sm">Search Queries</span>
          <span className="border border-solid border-blue-500 text-white px-4 py-2 rounded-full text-sm">Search Answers</span>
          <span className="border border-solid border-green-500 text-white px-4 py-2 rounded-full text-sm">Search Keywords</span>
        </div>

        {/* Chat Input Area */}
        <form
          className="relative rounded-lg border bg-card-foreground focus-within:ring-1 focus-within:ring-ring p-1 w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
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

        {/* Results Section */}
        <div className="mt-6 w-full max-w-md">
          {loading && <p className="text-center text-sm">Loading...</p>}
          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          {/* Search Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Search Results</h2>
              {results.map((queryResult: any, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card">
                  <p className="font-medium">
                    <a
                      href={`#`} // Replace with actual link if available
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {queryResult.content}
                    </a>
                  </p>
                  {queryResult.answers.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {queryResult.answers.map((answer: any, idx: number) => (
                        <li key={idx} className="text-sm text-muted">
                          {answer.content} -{" "}
                          <span className="italic">{answer.creatorName}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* AI Suggestion */}
          {aiSuggestion && (
            <div className="mt-6 p-4 border rounded-lg bg-card">
              <h2 className="text-lg font-semibold">AI Suggestion</h2>
              <p className="text-sm">{aiSuggestion}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
