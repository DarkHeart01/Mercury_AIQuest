import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button"; // Assuming you're using the Button component from your project
import { AppSidebar } from "@/components/app-sidebar-feed";
import './AnalyticsPage.css';

const AnalyticsPage = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch analytics data from the API
    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await fetch("http://65.1.43.251/api/analytics/");
                const data = await response.json();
                setAnalyticsData(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);

    // Render analytics charts for each tag
    const renderChart = (tagData: any) => {
        return (
            <div className="m-4 w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md chart-card">
                <h3 className="text-lg font-semibold text-black mb-2">{tagData.tagName}</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={tagData.dailyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="queries" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="answers" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 flex justify-between">
                    <div>
                        <strong>Queries:</strong> {tagData.queryCount}
                    </div>
                    <div>
                        <strong>Answers:</strong> {tagData.answerCount}
                    </div>
                </div>
            </div>
        );
    };

    // Helper function to split data into chunks of 3 items
    const chunkData = (data: any[], chunkSize: number) => {
        const result: any[] = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            result.push(data.slice(i, i + chunkSize));
        }
        return result;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const rows = chunkData(analyticsData, 3); // Group the data into rows of 3 charts each

    return (
        <>
            <AppSidebar />
            <div className="analytics-page-container flex flex-col w-full items-center">
                <h2 className="text-3xl font-bold">Analytics Overview</h2>
                <div className="w-full h-full">
                    {rows.length > 0 ? (
                        rows.map((row, index) => (
                            <div key={index} className="flex flex-row justify-center space-x-4 mb-6">
                                {row.map((tagData: any, index: number) => renderChart(tagData))}
                            </div>
                        ))
                    ) : (
                        <div>No data available</div>
                    )}
                </div>
                <Button variant="ghost" className="mt-8">Refresh Data</Button>
            </div>
        </>
    );
};

export default AnalyticsPage;

