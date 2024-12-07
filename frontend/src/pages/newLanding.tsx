import { useState } from "react";
import ReactJoyride, { Step } from "react-joyride";
import { AppSidebar } from "@/components/app-sidebar-feed";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Paperclip, Mic, CornerDownLeft, Loader } from "lucide-react";
import Logo from "@/images/merc.png";
import './newLanding.css';

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track if the search bar should move to the bottom
  const [isSearchBarAtBottom, setIsSearchBarAtBottom] = useState(false);

  // Track if the AI suggestion is ready to display
  const [aiReady, setAiReady] = useState(false);

  // Joyride state
  const [isTourActive, ] = useState(true);

  const joyrideSteps: Step[] = [
    {
      target: ".joyride-logo",
      content: "Welcome to Mercury, your personal Company AI assistant!",
    },
    {
      target: ".joyride-input",
      content: "Type your query here and hit 'Send' to get results!",
    },
    {
      target: ".joyride-gittalk",
      content: "This is GitTalk: Here you can chat directly with your repository's files!",
    },
    {
      target: ".joyride-docsense",
      content: "This is DocSense: Here you can chat directly with your company's documents!",
    },
    {
      target: ".joyride-batabloom",
      content: "This is DataBloom: Analyze and visualize your CSV data!",
    },
    {
      target: ".joyride-wiki",
      content: "This is ShareBase: Internal Compnay Wiki!",
    },
    {
      target: ".joyride-contribute",
      content: "You can contirbute to the companys database of documents and GitHub Repos!",
    },
    {
      target: ".joyride-analytics",
      content: "Check out the analytics of queries and answers for each department!",
    },
    {
      target: ".joyride-feed",
      content: "You can check out the feed to see what's going on in your company!",
    },
  ];

  const handleSend = async () => {
    if (!query.trim()) return; // Prevent empty queries

    setLoading(true); // Show loading state
    setResults([]);
    setAiSuggestion("");
    setError(null);
    setIsSearchBarAtBottom(true); // Move the search bar to the bottom
    setAiReady(false); // Hide the AI suggestion until it's ready

    // Simulate a 1-second loading spinner delay
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/query/search?search=${encodeURIComponent(query)}`
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
        setLoading(false); // Hide loading state
        setQuery(""); // Clear the input after sending
        setAiReady(true); // Show AI suggestion after the delay
      }
    }, 1000); // 1 second delay
  };

  return (
    <>
      <ReactJoyride
        steps={joyrideSteps}
        continuous
        scrollToFirstStep
        showProgress
        showSkipButton
        run={isTourActive}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <AppSidebar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background text-foreground relative page-fade-in">

        {/* Logo Section */}
        <div className="absolute top-2 w-full flex justify-center joyride-logo slide-up">
          <img src={Logo} alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Header */}
        {!isSearchBarAtBottom && (
          <div className="text-center mb-6 mt-20 joyride-header slide-up delay-1s">
            <h1 className="text-2xl font-bold">What can I help you with?</h1>
          </div>
        )}

        {/* Tags Section */}
        {!isSearchBarAtBottom && (
          <div className="flex flex-wrap justify-center gap-2 mb-6 joyride-tags slide-up delay-2s">
            <span className="border border-solid border-red-500 text-white px-4 py-2 rounded-full text-sm">
              Search Queries
            </span>
            <span className="border border-solid border-blue-500 text-white px-4 py-2 rounded-full text-sm">
              Search Answers
            </span>
            <span className="border border-solid border-green-500 text-white px-4 py-2 rounded-full text-sm">
              Search Keywords
            </span>
          </div>
        )}

        {/* Chat Input Area */}
        <form
          className={`w-[850px] rounded-lg border bg-[card-foreground] bg-[#2f2f2f] focus-within:ring-1 focus-within:ring-ring p-1 joyride-input slide-up delay-3s ${isSearchBarAtBottom ? 'fixed bottom-4' : ''}`}
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
        <div className="mt-6 w-full max-w-md joyride-results">
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <Loader className="animate-spin text-gray-600 w-8 h-8" />
            </div>
          )}
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
          {aiReady && aiSuggestion && (
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