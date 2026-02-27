import { useState } from "react";
import TodayTab from "../components/TodayTab";
import HistoryTab from "../components/HistoryTab";

type TabType = "today" | "history";

export default function TodayProblem() {
    const [activeTab, setActiveTab] = useState<TabType>("today");

    return (
        <div className="w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-8 py-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-primary-foreground">LeetCode Agent</h1>
                </div>
                <p className="text-primary-foreground/80 text-sm">Build consistency, master algorithms</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-border px-8 pt-4 gap-1">
                <button
                    onClick={() => setActiveTab("today")}
                    className={`pb-3 px-1 font-semibold text-sm transition-colors relative ${
                        activeTab === "today"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Today's Question
                    {activeTab === "today" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`pb-3 px-1 font-semibold text-sm transition-colors relative ml-4 ${
                        activeTab === "history"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    History
                    {activeTab === "history" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    )}
                </button>
            </div>

            {/* Tab Content */}
            <div className="px-8 py-6">
                {activeTab === "today" && <TodayTab />}
                {activeTab === "history" && <HistoryTab />}
            </div>
        </div>
    );
}
