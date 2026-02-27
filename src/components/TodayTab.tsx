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
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-border"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin"></div>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-foreground">Loading today's problem</p>
                    <p className="text-xs text-muted-foreground mt-1">Preparing your challenge</p>
                </div>
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
        Easy: "bg-success/10 text-success border border-success/30",
        Medium: "bg-warning/10 text-warning border border-warning/30",
        Hard: "bg-destructive/10 text-destructive border border-destructive/30",
    };

    return (
        <div className="space-y-5">
            {/* Problem Card */}
            <div className="bg-gradient-to-br from-secondary/60 to-secondary/40 rounded-xl p-6 border border-border hover:border-primary/50 transition-all">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-foreground text-lg leading-snug">
                            {problem.title}
                        </h3>
                    </div>
                    {problem.difficulty && (
                        <div className="flex gap-2">
                            <span
                                className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                                    difficultyColor[problem.difficulty]
                                }`}
                            >
                                {problem.difficulty}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-primary/8 border border-primary/20 rounded-xl p-4">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "Consistency beats intensity — one problem a day builds mastery."
                </p>
            </div>

            {/* CTA Button */}
            <a
                href={problem.url}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 active:bg-primary/80 transition-all shadow-md hover:shadow-lg group"
            >
                Solve on LeetCode
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </a>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                <div className="text-center">
                    <p className="text-xs text-muted-foreground font-medium">Solved</p>
                    <p className="text-xl font-bold text-primary mt-1">1.2M</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-muted-foreground font-medium">Success Rate</p>
                    <p className="text-xl font-bold text-primary mt-1">32.8%</p>
                </div>
            </div>
        </div>
    );
}
