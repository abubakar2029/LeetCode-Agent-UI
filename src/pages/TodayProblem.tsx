import { useState } from "react";
import TodayTab from "../components/TodayTab";
import HistoryTab from "../components/HistoryTab";

type TabType = "today" | "history";

export default function TodayProblem() {
    const [activeTab, setActiveTab] = useState<TabType>("today");

    return (
        <div className="w-96 bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
            {/* Header - Minimal */}
            <div className="bg-gradient-to-br from-primary to-primary/95 px-8 py-8 relative overflow-hidden">
                {/* Animated accent */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-accent rounded-full blur-2xl animate-pulse"></div>
                </div>
                
                <div className="relative">
                    <h1 className="text-2xl font-bold text-primary-foreground">Today</h1>
                    <p className="text-primary-foreground/85 text-xs font-medium mt-0.5">Daily challenge</p>
                </div>
            </div>

            {/* Tab Navigation - Clean */}
            <div className="flex border-b border-border px-8 pt-4 gap-0">
                <button
                    onClick={() => setActiveTab("today")}
                    className={`pb-3 px-0 font-semibold text-sm transition-colors relative mr-6 ${
                        activeTab === "today"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Challenge
                    {activeTab === "today" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`pb-3 px-0 font-semibold text-sm transition-colors relative ${
                        activeTab === "history"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    History
                    {activeTab === "history" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
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
