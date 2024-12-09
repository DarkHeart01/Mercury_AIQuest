import { useState } from "react";
import ReactJoyride, { Step } from "react-joyride";
import { AppSidebar } from "@/components/app-sidebar-feed";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Paperclip, Mic, CornerDownLeft, Loader } from "lucide-react";
import Logo from "@/images/logoopt4.png";
import "./newLanding.css";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [expandedResults, setExpandedResults] = useState<Record<number, boolean>>({});

  const joyrideSteps: Step[] = [
    {
      target: ".joyride-logo",
      content: "Welcome to Mercury, your personal Company AI assistant!",
    },
    // Additional steps...
  ];

  const handleSend = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);
    setAiSuggestion("");
    setError(null);

    setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/query/search?search=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        setResults(data.results.queries || []);
        setAiSuggestion(data.aiSuggestion || "No suggestion provided.");
      } catch (err) {
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
        setQuery("");
      }
    }, 1000);
  };

  const toggleExpand = (index: number) => {
    setExpandedResults((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <ReactJoyride
        steps={joyrideSteps}
        continuous
        scrollToFirstStep
        showProgress
        showSkipButton
        run={true}
        styles={{ options: { zIndex: 10000 } }}
      />
      <AppSidebar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background text-foreground relative page-fade-in">
        <div className="absolute top-2 w-full flex justify-center joyride-logo slide-up">
          <img src={Logo} alt="Logo" className="h-24" />
        </div>

        <div
          className="mt-6 w-full max-w-md joyride-results reply-card-scrollable"
          style={{
            maxHeight: "calc(100vh - 250px)",
            paddingBottom: "70px",
            paddingTop: "20px",
          }}
        >
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <Loader className="animate-spin text-gray-600 w-8 h-8" />
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-4 mt-6">
              <h2 className="text-lg font-semibold">Search Results</h2>
              {results.map((queryResult: any, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-card"
                >
                  <p className="font-medium">
                    <a
                      href={`/#/Query/${queryResult.queryID}`}
                      className="text-blue-600 hover:underline"
                      rel="noopener noreferrer"
                    >
                      {queryResult.title || "Found in feed"}
                    </a>
                  </p>
                  <div>
                    {expandedResults[index] ? (
                      <p>{queryResult.content}</p>
                    ) : (
                      <p className="preview-text">{queryResult.content}</p>
                    )}
                    <span
                      className="read-more-link"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedResults[index] ? "Show Less" : "Read More"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {aiSuggestion && (
            <div className="mt-6 p-4 border rounded-lg bg-card text-center reply-card-scrollable">
              <h2 className="text-lg font-semibold">AI Suggestion</h2>
              <p className="text-sm">{aiSuggestion}</p>
            </div>
          )}
        </div>

        <form
          className="w-[850px] rounded-lg border bg-[card-foreground] bg-[#2f2f2f] focus-within:ring-1 focus-within:ring-ring p-1 joyride-input slide-up delay-3s"
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
          <div className="flex items-center p-3 pt-0 mt-1">
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
      </div>
    </>
  );
}









