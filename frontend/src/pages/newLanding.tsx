import { useState, useRef } from "react";
import ReactJoyride, { Step } from "react-joyride";
import { AppSidebar } from "@/components/app-sidebar-feed";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Paperclip, Mic, CornerDownLeft, Loader } from "lucide-react";
import Logo from "@/images/logoopt4.png";
import axios from "axios";
import "./newLanding.css";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState<any>(null);
  const fileInputRef = useRef<any>(null);

  const [isSearchBarAtBottom, setIsSearchBarAtBottom] = useState(false);
  const [aiReady, setAiReady] = useState(false);

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
      content: "This is ShareBase: Internal Company Wiki!",
    },
    {
      target: ".joyride-contribute",
      content: "You can contribute to the companys' database of documents and GitHub Repos!",
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

    console.log('sent');

    const formData = new FormData();

    // Append the file only if selectedImage exists
    if (selectedImage) {
      formData.append("file", selectedImage);
    }
    
    setLoading(true);
    setResults([]);
    setAiSuggestion("");
    setError(null);
    setIsSearchBarAtBottom(true);
    setAiReady(false);
    setPreview(null);
    setSelectedImage(null);

    setTimeout(async () => {
      try {
        // Construct the API URL with query parameters
        const apiUrl = `${import.meta.env.VITE_API_URL}/query/search?search=${encodeURIComponent(query)}`;

        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);

        const data = response.data;

        setResults(data.results.queries || []);
        setAiSuggestion(data.aiSuggestion || "No suggestion provided.");
      } catch (err) {
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
        setQuery("");
        setAiReady(true);
      }
    }, 1000);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    // Trigger the file input dialog
    if (!fileInputRef) {
      alert("No file input ref");
      return;
    }

    fileInputRef.current.click();
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      // You can now upload the file to your server
    }
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
        <div className="absolute top-2 w-full flex justify-center joyride-logo slide-up" style={{ marginLeft: "-35px" }}>
          <img src={Logo} alt="Logo" className="h-24" />
        </div>

        {!isSearchBarAtBottom && !loading && (
          <div className="text-center mb-6 mt-20 joyride-header slide-up delay-1s">
            <h1 className="text-2xl font-bold">What can I help you with?</h1>
          </div>
        )}

        <div
          className="mt-6 w-full max-w-md joyride-results reply-card-scrollable"
          style={{
            maxHeight: isSearchBarAtBottom
              ? "calc(100vh - 150px)"
              : "calc(100vh - 250px)",
            paddingBottom: "70px",
            paddingTop: "20px",
            paddingRight: "30px",
          }}
        >
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <Loader className="animate-spin text-gray-600 w-8 h-8" />
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-center mb-4">Search Results</h2>
              <div className="flex justify-center items-stretch gap-4 flex-wrap">
              {results.map((queryResult: any, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[300px] p-4 border rounded-lg bg-card"
                    style={{ minHeight: "150px" }}
                  >
                    <p className="font-medium">
                      <a
                        href={`/#/Query/${queryResult.queryID}`}
                        className="text-blue-600 hover:underline"
                        rel="noopener noreferrer"
                      >
                        {queryResult.content}
                      </a>
                    </p>

                    {queryResult.answers.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {queryResult.answers.map((answer: any, idx: number) => (
                          <li key={idx} className="text-sm text-muted">
                            {answer.content.slice(0, 100)} -{" "}
                            <span className="italic">{answer.creatorName}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-muted">No answers yet.</p>
                    )}

                    {/* Image Box */}
                    {queryResult.imageUrl && (
                      <div className="mt-4 max-w-[15rem] max-h-[10rem] flex-shrink-0 mr-4 border border-gray-300 rounded overflow-hidden">
                        <img
                          src={queryResult.imageUrl}
                          alt="Query related"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {aiReady && aiSuggestion && (
            <div className="mt-6 p-4 border rounded-lg bg-card text-center overflow-y-auto reply-card-scrollable">
              <h2 className="text-lg font-semibold">AI Suggestion</h2>
              <p className="text-sm">{aiSuggestion}</p>
            </div>
          )}
        </div>

        <form
          className={`w-[850px] rounded-lg border bg-[card-foreground] bg-[#2f2f2f] focus-within:ring-1 focus-within:ring-ring p-1 joyride-input slide-up delay-3s ${isSearchBarAtBottom ? "fixed bottom-4" : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Image Preview Box Above Text Input */}
          {preview && (
            <div className="flex items-center justify-center mb-4">
              <div className="w-[10rem] h-[8rem] rounded-lg overflow-hidden border">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <ChatInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your query..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center p-3 pt-0 mt-1">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
            >
              <Paperclip className="size-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="sr-only">Attach image</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
            <Button size="sm" className="ml-auto gap-1.5" onClick={handleUpload}>
              Upload Image
              <CornerDownLeft className="size-3.5" />
            </Button>
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }} // Hide the input element
              onChange={handleFileChange} // Handle file selection
            />
            <Button size="sm" className="ml-2 gap-1.5" onClick={handleSend}>
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}