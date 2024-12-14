import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar-feed";
import "./Feed.css";

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
  imageUrl?: string;
}

const TrendingFeed: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [, setLoading] = useState(false);
  const [userId] = useState(15); // Hardcoded userId for the purpose of the example
  const [isPageVisible, setIsPageVisible] = useState(false); // For controlling page visibility on mount

  const navigate = useNavigate();

  useEffect(() => {
    setIsPageVisible(true); // Trigger the animation on component mount

    const fetchFeed = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/feed/trending`);
        setQueries(response.data.posts);
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const handleVote = async (queryId: number, type: "UPVOTE" | "DOWNVOTE") => {
    try {
      console.log(queryId);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/query/queries/${queryId}/vote`,
        {
          userId,
          type,
        }
      );
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

  const handleQueryClick = (queryId: number | undefined) => {
    if (queryId) {
      navigate(`/Query/${queryId}`);
    }
  };

  return (
    <>
      <AppSidebar />
      <div
        className={`p-4 w-full ${isPageVisible ? "fade-in" : ""}`} // Apply fade-in class when the page is visible
      >

        <div>
          {queries.map((query: Query) => (
            <div
              key={query.id || query.queryID}
              className="relative border-2 border-gray-400 p-4 mb-4 rounded-lg shadow-md cursor-pointer flex items-start"
              onClick={() => handleQueryClick(query.id || query.queryID)}
            >

              {/* Content */}
              <div className="flex-grow">
                <h2 className="text-xl font-bold">{query.content}</h2>
                <div className="text-sm text-gray-500">
                  {query.createdAt && new Date(query.createdAt).toLocaleString()}
                </div>

                {/* Voting Buttons */}
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    className="px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering `onClick` for the parent div
                      handleVote(query.id || query.queryID!, "UPVOTE");
                    }}
                  >
                    Upvote
                  </button>
                  <span className="px-3 py-1 border border-gray-300 rounded">{query.upvotesCount} Upvotes</span>
                  <button
                    className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering `onClick` for the parent div
                      handleVote(query.id || query.queryID!, "DOWNVOTE");
                    }}
                  >
                    Downvote
                  </button>
                  <span>{query.downvotesCount} Downvotes</span>
                </div>

                <div className="mt-2">
                  <h3 className="font-semibold">Answers:</h3>
                  {query.answers.length > 0 ? (
                    query.answers.map((answer, index) => (
                      <div key={index} className="p-2 border-t">
                        <p>{answer.content}</p>
                        <div className="text-sm text-gray-500 flex flex-row">
                          {answer.createdAt &&
                            new Date(answer.createdAt).toLocaleString()}{" "}
                          by {answer.creatorName || "Anonymous"}
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
                    {query.tags.map((tag) => (
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

              {/* Image Box */}
              {query.imageUrl && (
                <div className="max-w-[15rem] max-h-[15rem] flex-shrink-0 mr-4 border border-gray-300 rounded overflow-hidden">
                  <img
                    src={query.imageUrl}
                    alt="Query related"
                    className="w-full h-full object-contain"
                  />
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
