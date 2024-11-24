import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/app-sidebar-feed";

// Define types for the API responses
interface Answer {
  content: string;
  createdAt: string;
  creatorName?: string;
  isOfficial: boolean;
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

const TrendingFeed: React.FC = () => {
  const [trendingQueries, setTrendingQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(2); // Hardcoded userId for the purpose of the example

  useEffect(() => {
    // Fetch the trending queries
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://65.1.43.251/api/feed/trending"
        );
        console.log(response.data.posts);
        setTrendingQueries(response.data.posts || []);
      } catch (error) {
        console.error("Error fetching trending queries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const handleVote = async (queryId: number, type: "UPVOTE" | "DOWNVOTE") => {
    try {
      const response = await axios.post(
        `http://65.1.43.251/api/query/queries/${queryId}/vote`,
        {
          userId,
          type,
        }
      );
      // Update the query's upvote/downvote count after voting
      setTrendingQueries((prevQueries) =>
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
        <h1 className="text-2xl font-bold mb-4">Trending Queries</h1>
        {loading && <p>Loading...</p>}

        <div>
          {trendingQueries.map((query: any) => (
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
                <span>{query.upvotesCount} Upvotes</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleVote(query.id || query.queryID, "DOWNVOTE")}
                >
                  Downvote
                </button>
                <span>{query.downvotesCount} Downvotes</span>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold">Answers:</h3>
                {query.answers.length > 0 ? (
                  query.answers.map((answer: any, index: number) => (
                    <div key={index} className="p-2 border-t">
                      <p>{answer.content}</p>
                      <div className="text-sm text-gray-500 flex flex-row">
                        {answer.createdAt && new Date(answer.createdAt).toLocaleString()} by{" "}
                        {answer.creatorName || "Anonymous"}
                        {answer.isOfficial && (
                          <span className="text-xs bg-yellow-300 text-yellow-800 px-2 py-1 rounded-full ml-2">
                            Official
                          </span>
                        )}
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

export default TrendingFeed;
