import { AppSidebar } from "@/components/app-sidebar-feed";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        department: {
            name: string;
        };
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
        answerCreator: {
            id: number;
            email: string;
            designation: string;
        };
    }[];
}

const QueryPage: React.FC = () => {
    const { queryId } = useParams<{ queryId: string }>();
    const [query, setQuery] = useState<Query | null>(null);
    const [loading, setLoading] = useState(false);

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

    const handleMarkOfficial = async (answerId: number) => {
        try {
            const userId = 7; // Replace with dynamic userId if needed
            await axios.post(`http://65.1.43.251/api/query/answers/${answerId}/markOfficial`, {
                userId,
            });

            setQuery((prevQuery) => {
                if (!prevQuery) return null;
                return {
                    ...prevQuery,
                    answers: prevQuery.answers.map((answer) =>
                        answer.id === answerId ? { ...answer, isOfficial: true } : answer
                    ),
                };
            });
        } catch (error) {
            console.error("Error marking answer as official:", error);
        }
    };

    const handleAnswerVote = async (
        answerId: number,
        queryId: number,
        type: "UPVOTE" | "DOWNVOTE"
    ) => {
        try {
            const userId = 5; // Replace with dynamic userId if needed
            await axios.post(`http://65.1.43.251/api/query/answers/${answerId}/vote`, {
                userId,
                type,
                queryId,
            });

            setQuery((prevQuery) => {
                if (!prevQuery) return null;
                return {
                    ...prevQuery,
                    answers: prevQuery.answers.map((answer) =>
                        answer.id === answerId
                            ? {
                                ...answer,
                                upvotesCount:
                                    type === "UPVOTE"
                                        ? answer.upvotesCount + 1
                                        : answer.upvotesCount,
                                downvotesCount:
                                    type === "DOWNVOTE"
                                        ? answer.downvotesCount + 1
                                        : answer.downvotesCount,
                            }
                            : answer
                    ),
                };
            });
        } catch (error) {
            console.error("Error voting on answer:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!query) {
        return <div>No query found.</div>;
    }

    return (
        <>
            <AppSidebar />
            <div className="w-full mt-10 flex justify-center">
                <div className="p-4 w-[65%]">
                    <h1 className="text-2xl font-bold w-[65%]">{query.content}</h1>
                    <div className="text-sm text-gray-500">
                        {new Date(query.createdAt).toLocaleString()}
                    </div>

                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Answers</h2>
                        {query.answers.map((answer) => (
                            <div
                                key={answer.id}
                                className="p-4 border rounded mt-2 shadow-sm bg-background"
                            >
                                <p>{answer.content}</p>
                                <div className="text-sm text-gray-500">
                                    {new Date(answer.createdAt).toLocaleString()} by{" "}
                                    {answer.answerCreator.email}
                                    {answer.isOfficial && (
                                        <span className="ml-2 text-xs bg-yellow-300 text-yellow-800 px-2 py-1 rounded-full">
                                            Official
                                        </span>
                                    )}
                                </div>

                                <div className="mt-2 flex space-x-4">
                                    <button
                                        className="text-green-500 border border-green-500 px-2 py-1 rounded hover:bg-green-500 hover:text-white"
                                        onClick={() =>
                                            handleAnswerVote(answer.id, query.id, "UPVOTE")
                                        }
                                    >
                                        Upvote ({answer.upvotesCount})
                                    </button>
                                    <button
                                        className="text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white"
                                        onClick={() =>
                                            handleAnswerVote(answer.id, query.id, "DOWNVOTE")
                                        }
                                    >
                                        Downvote ({answer.downvotesCount})
                                    </button>
                                    {!answer.isOfficial && (
                                        <button
                                            className="text-blue-500 border border-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white"
                                            onClick={() => handleMarkOfficial(answer.id)}
                                        >
                                            Mark as Official
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default QueryPage;
