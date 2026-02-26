import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import TodayTab from "../components/TodayTab";
import HistoryTab from "../components/HistoryTab";

type TabType = "today" | "history";

export default function TodayProblem() {
    const [activeTab, setActiveTab] = useState<TabType>("today");

    return (
        <div className="w-96 bg-background rounded-lg shadow-lg overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
                <h1 className="text-xl font-bold text-primary-foreground">LeetCode Agent</h1>
                <p className="text-primary-foreground/80 text-sm mt-1">Daily problems for consistent growth</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-border px-6 pt-4">
                <button
                    onClick={() => setActiveTab("today")}
                    className={`pb-3 px-2 font-medium text-sm transition-colors relative ${
                        activeTab === "today"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Today's Question
                    {activeTab === "today" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`pb-3 px-2 font-medium text-sm transition-colors relative ml-6 ${
                        activeTab === "history"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    History
                    {activeTab === "history" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                    )}
                </button>
            </div>

            {/* Tab Content */}
            <div className="px-6 py-4">
                {activeTab === "today" && <TodayTab />}
                {activeTab === "history" && <HistoryTab />}
            </div>
        </div>
    );
}

export default function TodayProblem() {
    const [problem, setProblem] = useState<Problem | null>(null);

    // useEffect(() => {
    //     fetch(`${API_BASE_URL}/problem/today`)
    //         .then((res) => res.json())
    //         .then((data: Problem) => setProblem(data))
    //         .catch(() =>
    //             setProblem({
    //                 title: "Two Sum",
    //                 url: "https://leetcode.com/problems/two-sum",
    //             })
    //         );
    // }, []);

    if (!problem) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4 w-72">
            <h2 className="text-lg font-bold mb-2">Today's Problem</h2>
            <a href={problem.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {problem.title}
            </a>
            <p className="mt-3 text-sm italic text-gray-600">
                “Consistency beats intensity — one problem a day builds mastery.”
            </p>
        </div>
    );
}
