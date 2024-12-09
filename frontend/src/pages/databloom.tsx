import * as React from "react";
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-feed";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Forward, Heart } from "lucide-react";
import { CornerDownLeft, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
    ChatBubbleAction,
    ChatBubbleActionWrapper,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import MessageLoading from "@/components/ui/chat/message-loading";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataBloom = () => {
    const [messages, setMessages] = React.useState([
        {
            id: 1,
            data: "What are you?",
            columns: [],
            labels: [],
            sender: "user",
        },
        {
            id: 2,
            data: "I'm DataBloom!",
            columns: [],
            labels: [],
            sender: "bot",
        },
    ]);

    const [inputValue, setInputValue] = React.useState("");
    const [csvs, setCSVs] = useState<any[]>([]);
    const [selectedCSV, setSelectedCSV] = useState<string | null>(null);
    const [selectedCSVID, setSelectedCSVID] = useState<number | null>(null);
    const [fileLoading, setFileLoading] = useState(true); // Loading indicator for csvs
    const [, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false); // Message loading state

    // Fetch the list of csvs from the API on component mount
    useEffect(() => {
        const fetchCSVs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/upload/csv`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setCSVs(data);
            } catch (err) {
                setError("Failed to fetch csvs. Please try again.");
            } finally {
                setFileLoading(false);
            }
        };
        fetchCSVs();
    }, []);


    const handleVisualize = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!inputValue.trim()) return;

        // Add the user message to the chat
        const userMessage = {
            id: messages.length + 1,
            data: inputValue,
            columns: [],
            labels: [],
            sender: "user",
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputValue("");
        setIsLoading(true); // Start loading

        // Simulate a 3-second delay for loading
        setTimeout(async () => {
            try {

                // Send the request to visualize data
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/talk/csv/visualize?query=${encodeURIComponent(inputValue)}`,
                    {
                        csvID: selectedCSVID,
                    }
                );

                const { data, labels } = response.data.externalResponse;

                // Add the AI response to the chat with visualization data
                const botMessage = {
                    id: messages.length + 2,
                    data: data,
                    columns: [],
                    labels: labels,
                    sender: "bot",
                };

                setMessages((prevMessages) => [...prevMessages, botMessage]);

            } catch (error) {
                const errorMessage = {
                    id: messages.length + 2,
                    data: "There was an error fetching the visualization data. Please try again later.",
                    columns: [],
                    labels: [],
                    sender: "bot",
                };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            } finally {
                setIsLoading(false); // Stop loading after the delay
            }
        }, 3000); // 3-second delay
    };


    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!inputValue.trim()) return;

        // Add the user message to the chat
        const userMessage = {
            id: messages.length + 1,
            data: inputValue,
            columns: [],
            labels: [],
            sender: "user",
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputValue("");
        setIsLoading(true); // Start loading

        // Simulate a 5-second delay for loading
        setTimeout(async () => {
            try {

                // Send the message to the API
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/talk/csv?query=${encodeURIComponent(inputValue)}`,
                    {
                        csvID: selectedCSVID,
                    }
                );

                const data = response.data.externalResponse;

                // Add the AI response to the chat
                const botMessage = {
                    id: messages.length + 2,
                    data: data.data || {},
                    columns: data.columns || [],
                    labels: data.labels || [],
                    sender: "bot",
                };

                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                const errorMessage = {
                    id: messages.length + 2,
                    data: "There was an error connecting to the server. Please try again later.",
                    columns: [],
                    labels: [],
                    sender: "bot",
                };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            } finally {
                setIsLoading(false); // Stop loading after the delay
            }
        }, 3000); // 3-second delay
    };

    const actionIcons = [
        { icon: DotsVerticalIcon, type: "More" },
        { icon: Forward, type: "Share" },
        { icon: Heart, type: "Like" },
    ];

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-row w-full items-center justify-center">
                <div className="flex flex-col h-screen w-[65%] mx-auto bg-background shadow-lg rounded-lg page-container">
                    {/* Chat Message List */}
                    <ChatMessageList>
                        {messages.map((message: any) => {
                            const variant = message.sender === "user" ? "sent" : "received";
                            
                            if (message.columns.length > 0 && message.data.length > 0) {
                                return (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full table-fixed border-collapse border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    {message.columns.map((col: string, index: number) => (
                                                        <th
                                                            key={index}
                                                            className="px-4 py-2 border border-gray-400 text-sm font-bold text-gray-700 uppercase text-center"
                                                        >
                                                            {col.replace(/_/g, ' ')}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {message.data.map((row: Record<string, any>, rowIndex: number) => (
                                                    <tr
                                                        key={rowIndex}
                                                        className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                            } hover:bg-blue-50 transition-colors`}
                                                    >
                                                        {message.columns.map((col: string, colIndex: number) => (
                                                            <td
                                                                key={colIndex}
                                                                className="px-4 py-2 border border-gray-400 text-sm text-gray-600 text-center"
                                                            >
                                                                {typeof row[col] === 'number'
                                                                    ? row[col].toLocaleString() // Format numbers
                                                                    : row[col]}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            }

                            else if (message.labels.length > 0) {
                                return (
                                    <ChatBubble key={message.id} variant="received" className="chat-bubble-enter">
                                        <ChatBubbleAvatar fallback="AI" />
                                        <div className="bg-gray-100 rounded-lg p-3 shadow-md">
                                            <Bar
                                                data={{
                                                    labels: message.labels, // Labels from your message
                                                    datasets: [
                                                        {
                                                            label: 'Data', // Label for the dataset
                                                            data: message.data, // Data values from your message
                                                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set this dynamically or customize it
                                                            borderColor: 'rgba(75, 192, 192, 1)', // Customize border color
                                                            borderWidth: 1, // Customize border width
                                                        },
                                                    ],
                                                }}
                                                options={{
                                                    responsive: true,
                                                    plugins: {
                                                        legend: {
                                                            position: 'top', // Customize legend position
                                                        },
                                                        tooltip: {
                                                            enabled: true, // Enable tooltips
                                                        },
                                                    },
                                                    scales: {
                                                        x: {
                                                            title: {
                                                                display: true,
                                                                text: 'Time Periods', // X-axis title
                                                            },
                                                        },
                                                        y: {
                                                            title: {
                                                                display: true,
                                                                text: 'Values', // Y-axis title
                                                            },
                                                            beginAtZero: true, // Ensure Y-axis starts at 0
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>
                                    </ChatBubble>
                                );
                            }
                            else {
                                return (
                                    <ChatBubble key={message.id} variant={variant} className="chat-bubble-enter">
                                        <ChatBubbleAvatar fallback={variant === "sent" ? "US" : "AI"} />
                                        <ChatBubbleMessage
                                            isLoading={message.isLoading}
                                            className={message.sender === "user" ? "bg-sky-400" : ""}
                                        >
                                            <ReactMarkdown
                                                className="markdown-content"
                                                remarkPlugins={[remarkGfm]} // Optional: GitHub flavored Markdown
                                            >
                                                {message.data}
                                            </ReactMarkdown>
                                        </ChatBubbleMessage>
                                        {/* Action Icons */}
                                        <ChatBubbleActionWrapper className="chat-action-icons">
                                            {actionIcons.map(({ icon: Icon, type }) => (
                                                <ChatBubbleAction
                                                    className="size-7"
                                                    key={type}
                                                    icon={<Icon className="size-4" />}
                                                    onClick={() =>
                                                        console.log(
                                                            `Action ${type} clicked for message ${message.id}`
                                                        )
                                                    }
                                                />
                                            ))}
                                        </ChatBubbleActionWrapper>
                                    </ChatBubble>
                                );
                            }
                        })}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <MessageLoading />
                        )}
                    </ChatMessageList>

                    {/* Chat Input */}
                    <form
                        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1 chat-input-container"
                        onSubmit={handleSendMessage}
                    >
                        <ChatInput
                            placeholder="Type your message here..."
                            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div className="flex items-center p-3 pt-0">
                            {/* File Selector Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="ml-2">
                                        {selectedCSV ? selectedCSV : "Select a File"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {fileLoading ? (
                                        <DropdownMenuItem className="text-sm text-muted">
                                            Loading CSVs...
                                        </DropdownMenuItem>
                                    ) : (
                                        csvs.map((csv) => (
                                            <DropdownMenuItem
                                                key={csv.id}
                                                onClick={() => {
                                                    setSelectedCSV(csv.csvName);
                                                    setSelectedCSVID(csv.id);
                                                }}
                                                className="cursor-pointer bg-[#252525]"
                                            >
                                                {csv.csvName}
                                            </DropdownMenuItem>
                                        ))
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant="ghost" size="icon">
                                <Mic className="size-4" />
                                <span className="sr-only">Use Microphone</span>
                            </Button>
                            <Button
                                onClick={handleVisualize}
                                variant="outline"
                                size="sm"
                                className="ml-auto gap-1.5"
                            >
                                Visualize
                            </Button>

                            <Button size="sm" className="ml-auto gap-1.5" type="submit">
                                Send Message
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default DataBloom;
