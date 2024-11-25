import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar-feed";

interface Query {
    id: number;
    content: string;
    createdAt: string;
    upvotesCount: number;
    downvotesCount: number;
    answersCount: number;
    creator: {
        id: number;
        email: string;
        designation: string;
        department: { name: string };
    };
    tags: { id: number; name: string }[];
    votes: { id: number; queryId: number; userId: number; type: string }[];
    answers: {
        id: number;
        content: string;
        createdAt: string;
        queryId: number;
        answerCreatorId: number;
        upvotesCount: number;
        downvotesCount: number;
        isOfficial: boolean;
        answerCreator: { id: number; email: string; designation: string };
    }[];
}

const QueryPage: React.FC = () => {
    const { queryId } = useParams<{ queryId: string }>();
    const [query, setQuery] = useState<Query | null>(null);
    const [loading, setLoading] = useState(false);
    const [userId] = useState(3); // Hardcoded userId for the example

    useEffect(() => {
        const fetchQueryDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Query>(
                    `http://65.1.43.251/api/query/query/${queryId}`
                );
                setQuery(response.data);
            } catch (error) {
                console.error("Error fetching query details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (queryId) {
            fetchQueryDetails();
        }
    }, [queryId]);

    const handleVote = async (type: "UPVOTE" | "DOWNVOTE") => {
        if (!query) return;

        try {
            await axios.post(
                `http://65.1.43.251/api/query/queries/${query.id}/vote`,
                { userId, type }
            );

            setQuery((prevQuery) =>
                prevQuery
                    ? {
                        ...prevQuery,
                        upvotesCount:
                            type === "UPVOTE"
                                ? prevQuery.upvotesCount + 1
                                : prevQuery.upvotesCount,
                        downvotesCount:
                            type === "DOWNVOTE"
                                ? prevQuery.downvotesCount + 1
                                : prevQuery.downvotesCount,
                    }
                    : null
            );
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!query) {
        return <div className="text-center">No Query Found</div>;
    }

    return (
        <>
            <AppSidebar />
            <div className="flex w-full justify-center ">
                <div className="p-4 w-[65%]">
                    <div className="border border-gray-300 rounded-lg shadow p-4">
                        <h2 className="text-xl font-bold">{query.content}</h2>
                        <p className="text-sm text-gray-500">
                            {new Date(query.createdAt).toLocaleString()}
                        </p>

                        {/* Voting Section */}
                        <div className="mt-4 flex items-center gap-4">
                            <button
                                onClick={() => handleVote("UPVOTE")}
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Upvote
                            </button>
                            <span>{query.upvotesCount} Upvotes</span>
                            <button
                                onClick={() => handleVote("DOWNVOTE")}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Downvote
                            </button>
                            <span>{query.downvotesCount} Downvotes</span>
                        </div>

                        {/* Answers Section */}
                        <div className="mt-6">
                            <h3 className="font-semibold">Answers:</h3>
                            {query.answers.length > 0 ? (
                                query.answers.map((answer) => (
                                    <div
                                        key={answer.id}
                                        className="border-t border-gray-300 mt-2 pt-2"
                                    >
                                        <p>{answer.content}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(answer.createdAt).toLocaleString()} by{" "}
                                            {answer.answerCreator.email}
                                        </p>
                                        {answer.isOfficial && (
                                            <span className="text-xs bg-yellow-300 px-2 py-1 rounded-full">
                                                Official
                                            </span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No answers yet.</p>
                            )}
                        </div>

                        {/* Tags Section */}
                        {query.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
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
                </div>
            </div>
        </>
    );
};

export default QueryPage;
