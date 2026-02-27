import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

interface Problem {
    title: string;
    url: string;
    difficulty?: "Easy" | "Medium" | "Hard";
}

export default function TodayTab() {
    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setLoading(true);
    // fetch(`${API_BASE_URL}/problem/today`)
    //         .then((res) => res.json())
    //         .then((data: Problem) => setProblem(data))
    //         //  in case of API failure, use a default problem
    //         .catch(() =>
    //             setProblem({
    //                 title: "Two Sum",
    //                 url: "https://leetcode.com/problems/two-sum",
    //             })
    //         );
    //     // API call Simulation
    //     // setTimeout(() => {
    //     //     setProblem({
    //     //         title: "Two Sum",
    //     //         url: "https://leetcode.com/problems/two-sum",
    //     //         difficulty: "Easy",
    //     //     });
    //     //     setLoading(false);
    //     // }, 500);
    // }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No problem available today</p>
            </div>
        );
    }

    const difficultyColor = {
        Easy: "bg-green-100 text-green-800",
        Medium: "bg-yellow-100 text-yellow-800",
        Hard: "bg-red-100 text-red-800",
    };

    return (
        <div className="space-y-4">
            {/* Problem Card */}
            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-base leading-snug">
                            {problem.title}
                        </h3>
                        {problem.difficulty && (
                            <div className="mt-3 flex gap-2">
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded ${
                                        difficultyColor[problem.difficulty]
                                    }`}
                                >
                                    {problem.difficulty}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <p className="text-sm text-muted-foreground italic">
                    "Consistency beats intensity — one problem a day builds mastery."
                </p>
            </div>

            {/* CTA Button */}
            <a
                href={problem.url}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
                Solve on LeetCode
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </a>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                <div className="text-center">
                    <p className="text-xs text-muted-foreground">Solved</p>
                    <p className="text-lg font-semibold text-foreground">1,240K</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                    <p className="text-lg font-semibold text-foreground">32.8%</p>
                </div>
            </div>
        </div>
    );
}
