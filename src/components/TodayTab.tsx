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
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-primary border-r-primary border-b-accent animate-spin"></div>
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
        Easy: "bg-success text-white font-bold text-xs",
        Medium: "bg-warning text-white font-bold text-xs",
        Hard: "bg-destructive text-white font-bold text-xs",
    };

    return (
        <div className="space-y-4">
            {/* Problem Card - Minimal */}
            <div className="p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-default">
                <h3 className="font-bold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
                    {problem.title}
                </h3>
                {problem.difficulty && (
                    <div className="mt-3">
                        <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                                difficultyColor[problem.difficulty]
                            }`}
                        >
                            {problem.difficulty}
                        </span>
                    </div>
                )}
            </div>

            {/* CTA Button - Energetic */}
            <a
                href={problem.url}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all group"
            >
                Solve Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </a>

            {/* Stats - Minimal */}
            <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="p-3 rounded-lg border border-border/50 text-center hover:border-primary/50 hover:bg-secondary/30 transition-all">
                    <p className="text-xs text-muted-foreground mb-1">Solved</p>
                    <p className="font-bold text-primary text-lg">1.2M</p>
                </div>
                <div className="p-3 rounded-lg border border-border/50 text-center hover:border-primary/50 hover:bg-secondary/30 transition-all">
                    <p className="text-xs text-muted-foreground mb-1">Success</p>
                    <p className="font-bold text-primary text-lg">32.8%</p>
                </div>
            </div>
        </div>
    );
}
