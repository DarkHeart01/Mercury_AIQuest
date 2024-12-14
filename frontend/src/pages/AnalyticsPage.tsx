import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar-feed";
import './AnalyticsPage.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff6347', '#ffb6c1', '#8a2be2'];

const AnalyticsPage = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/analytics/`);
                const data = response.data;
                setAnalyticsData(data.sort((a: any, b: any) => b.queryCount - a.queryCount).slice(0, 20));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);

    // Render a Line Chart with a title and legend
    const renderLineChart = (tagData: any) => (
        <div className="chart-card p-4 bg-white rounded-lg shadow-lg">
            {/* Title for Line Chart */}
            <h3 className="text-lg text-black font-semibold mb-4 text-center">
                {tagData.tagName}: Daily Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={tagData.dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="queries" name="Queries" stroke="#8884d8" />
                    <Line type="monotone" dataKey="answers" name="Answers" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    const renderBarChart = (tagData: any) => (
        <div className="chart-card p-4 bg-white rounded-lg shadow-lg">
            {/* Title for Bar Chart */}
            <h3 className="text-lg text-black font-semibold mb-4 text-center">
                {tagData.tagName}: Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tagData.dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="queries" name="Queries" fill="#8884d8" />
                    <Bar dataKey="answers" name="Answers" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

    const renderPieChart = (tagData: any) => {
        const pieData = [
            { name: "Queries", value: tagData.queryCount },
            { name: "Answers", value: tagData.answerCount },
        ];
        return (
            <div className="chart-card p-4 bg-white rounded-lg shadow-lg">
                {/* Title for Pie Chart */}
                <h3 className="text-lg text-black font-semibold mb-4 text-center">
                    {tagData.tagName}: Total Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    };


    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <>
            <AppSidebar />
            <div className="analytics-page-container m-5 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-8 text-center">Analytics Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4">
                    {analyticsData.map((tagData: any, index: number) => (
                        <div key={index} className="flex flex-col space-y-4">
                            {renderLineChart(tagData)}
                            {renderBarChart(tagData)}
                            {renderPieChart(tagData)}
                        </div>
                    ))}
                </div>
                <Button variant="ghost" className="mt-8">Refresh Data</Button>
            </div>
        </>
    );
};

export default AnalyticsPage;
