import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/app-sidebar-feed";

// Define types for the API responses
interface Answer {
  content: string;
  createdAt: string;
  creatorName?: string;
}

interface Query {
  id?: number;
  queryID?: number;
  content: string;
  answers: Answer[];
  createdAt?: string;
  upvotesCount?: number;
  downvotesCount?: number;
  answersCount?: number;
  tags?: { id: number; name: string }[];
}

interface APIResponse {
  results?: {
    queries: Query[];
  };
  aiSuggestion?: string;
}

const SearchFeed: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [userId] = useState(2); // Hardcoded userId for the purpose of the example

  useEffect(() => {
    // Fetch the entire feed initially
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Query[]>("http://65.1.43.251/api/query/queries");
        setQueries(response.data);
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get<APIResponse>(
        `http://65.1.43.251/api/query/search?search=${encodeURIComponent(search)}`
      );
      const { results, aiSuggestion } = response.data;
      setQueries(results?.queries || []);
      setAiSuggestion(aiSuggestion || null);
    } catch (error) {
      console.error("Error searching queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (queryId: number, type: "UPVOTE" | "DOWNVOTE") => {
    try {
      const response = await axios.post(
        `http://65.1.43.251/api/query/queries/${queryId}/vote`,
        {
          userId,
          type
        }
      );
      // Update the query's upvote/downvote count after voting
      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query.id === queryId
            ? {
                ...query,
                upvotesCount:
                  type === "UPVOTE"
                    ? (query.upvotesCount || 0) + 1
                    : query.upvotesCount,
                downvotesCount:
                  type === "DOWNVOTE"
                    ? (query.downvotesCount || 0) + 1
                    : query.downvotesCount,
              }
            : query
        )
      );
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <>
      <AppSidebar />
      <div className="p-4 w-full">
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search queries..."
            className="border rounded p-2 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}

        {aiSuggestion && (
          <div className="p-4 mb-4 bg-gray-100 rounded">
            <strong>AI Suggestion:</strong> {aiSuggestion}
          </div>
        )}

        <div>
          {queries.map((query: any) => (
            <div key={query.id || query.queryID} className="border p-4 mb-4 rounded shadow">
              <h2 className="text-xl font-bold">{query.content}</h2>
              <div className="text-sm text-gray-500">
                {query.createdAt && new Date(query.createdAt).toLocaleString()}
              </div>

              {/* Voting Buttons */}
              <div className="mt-4 flex items-center space-x-4">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => handleVote(query.id || query.queryID, "UPVOTE")}
                >
                  Upvote
                </button>
                <span>
                  {query.upvotesCount} Upvotes
                </span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleVote(query.id || query.queryID, "DOWNVOTE")}
                >
                  Downvote
                </button>
                <span>
                  {query.downvotesCount} Downvotes
                </span>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold">Answers:</h3>
                {query.answers.length > 0 ? (
                  query.answers.map((answer: any, index: number) => (
                    <div key={index} className="p-2 border-t">
                      <p>{answer.content}</p>
                      <div className="text-sm text-gray-500">
                        {answer.createdAt && new Date(answer.createdAt).toLocaleString()} by {answer.creatorName || "Anonymous"}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No answers yet.</p>
                )}
              </div>

              {query.tags && (
                <div className="mt-2 flex gap-2">
                  {query.tags.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="bg-blue-100 text-blue-600 px-2 py-1 text-sm rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchFeed;
