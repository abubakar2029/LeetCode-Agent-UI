import { useState } from "react";
import TodayTab from "../components/TodayTab";
import HistoryTab from "../components/HistoryTab";

type TabType = "today" | "history";

export default function TodayProblem() {
    const [activeTab, setActiveTab] = useState<TabType>("today");

    return (
        <div className="w-full max-w-md bg-background rounded-2xl shadow-xl overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 px-8 py-10">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-primary-foreground">LeetCode Agent</h1>
                    <p className="text-primary-foreground/90 text-sm font-light">Your daily coding challenge</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-border px-8 pt-1 gap-1">
                <button
                    onClick={() => setActiveTab("today")}
                    className={`pb-4 px-1 font-semibold text-sm transition-all relative ${
                        activeTab === "today"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Today's Question
                    {activeTab === "today" && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`pb-4 px-1 font-semibold text-sm transition-all relative ${
                        activeTab === "history"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    History
                    {activeTab === "history" && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t"></div>
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
