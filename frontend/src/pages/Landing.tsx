import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-feed";
import { ChatInput } from "@/components/ui/chat/chat-input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Assuming SHADCN Dropdown is installed
import { Input } from "@/components/ui/input"; // Assuming SHADCN Input component is installed
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Card component from SHADCN
import { FaSpinner } from "react-icons/fa"; // Importing the loading spinner from react-icons
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"; // Importing the search icon
import { useState } from "react";
import "./Landing.css";
import Logo from "@/images/MERCAI.png";
import { Link } from "react-router-dom";

export default function Landing({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState(""); // To hold the search query
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [results, setResults] = useState<string[]>([]); // To hold search results

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when search is submitted
    setResults([]); // Optionally, clear previous results

    // Simulate a delay (e.g., API call) for loading
    setTimeout(() => {
      // After the "loading" period, update the results and stop loading
      setResults(["Result 1", "Result 2", "Result 3"]); // Simulate some results
      setIsLoading(false); // Stop loading
    }, 2000); // Adjust the time for the "loading" state (e.g., 2 seconds)
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex">
        <main className="flex-1 flex flex-col items-center justify-center h-screen pl-[260px]"> {/* Adjust left padding for sidebar */}
          {/* Logo */}
          <div className="absolute top-2 w-full flex justify-center">
            <img src={ Logo } alt="Logo" className="h-16 w-auto" />
          </div>

          {/* Search Bar with Magnifying Glass Icon */}
          <div className="absolute bottom-8 w-full px-4 flex justify-center">
            <div className="relative w-[80%]">
              <form onSubmit={handleSearchSubmit}>
                <ChatInput
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w- h-12 pl-12 bg-white text-black border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-500"
                />
                {/* Magnifying Glass Icon */}
                <MagnifyingGlassCircleIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </form>
            </div>
          </div>

          {/* Loading Spinner Icon */}
          {isLoading && (
            <div className="absolute bottom-24 w-full flex justify-center">
              <FaSpinner className="text-gray-500 animate-spin h-8 w-8" />
            </div>
          )}

          {/* Display Cards with Results (Only after loading is complete) */}
          {!isLoading && results.length > 0 && (
            <div className="w-full px-8 mt-12 space-y-8">
              {/* Sources Section */}
              <section>
                <h2 className="text-2xl font-bold text-black mb-4">Sources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {results.map((result, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{result}</CardTitle>
                        <CardDescription>Description for {result}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500">Additional details for {result}.</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* AI Response Section */}
              <section>
                <h2 className="text-2xl font-bold text-black mb-4">AI Generated Response</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Answer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      Here is the AI-generated response based on your search query. You can show more detailed or dynamic information here.
                    </p>
                  </CardContent>
                </Card>
              </section>
            </div>
          )}

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-1/2 right-4 transform -translate-y-1/2">
              {/* Removed MagnifyingGlassCircleIcon */}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black border border-gray-700 text-white">
              <DropdownMenuItem onClick={() => {}}>Option 1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Option 2</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Option 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </main>
      </div>
    </SidebarProvider>
  );
}
