import { useState, useMemo } from "react";

interface HistoryItem {
    id: number;
    number: number;
    title: string;
    url: string;
    difficulty: "Easy" | "Medium" | "Hard";
    solved: boolean;
}

const MOCK_PROBLEMS: HistoryItem[] = [
    {
        id: 1,
        number: 1,
        title: "Two Sum",
        url: "https://leetcode.com/problems/two-sum",
        difficulty: "Easy",
        solved: true,
    },
    {
        id: 2,
        number: 2,
        title: "Add Two Numbers",
        url: "https://leetcode.com/problems/add-two-numbers",
        difficulty: "Medium",
        solved: true,
    },
    {
        id: 3,
        number: 3,
        title: "Longest Substring Without Repeating Characters",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters",
        difficulty: "Medium",
        solved: false,
    },
    {
        id: 4,
        number: 4,
        title: "Median of Two Sorted Arrays",
        url: "https://leetcode.com/problems/median-of-two-sorted-arrays",
        difficulty: "Hard",
        solved: false,
    },
    {
        id: 5,
        number: 5,
        title: "Longest Palindromic Substring",
        url: "https://leetcode.com/problems/longest-palindromic-substring",
        difficulty: "Medium",
        solved: true,
    },
];

export default function HistoryTab() {
    const [searchQuery, setSearchQuery] = useState("");
    const [itemsToShow, setItemsToShow] = useState(5);

    // Filter problems based on search query
    const filteredProblems = useMemo(() => {
        return MOCK_PROBLEMS.filter((problem) =>
            problem.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, itemsToShow);
    }, [searchQuery, itemsToShow]);

    const difficultyColor = {
        Easy: "bg-success/15 text-success font-semibold",
        Medium: "bg-warning/15 text-warning font-semibold",
        Hard: "bg-destructive/15 text-destructive font-semibold",
    };

    const hasMore = filteredProblems.length < MOCK_PROBLEMS.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).length;

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setItemsToShow(5);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
            </div>

            {/* Problems List */}
            <div className="space-y-2">
                {filteredProblems.length > 0 ? (
                    filteredProblems.map((problem) => (
                        <a
                            key={problem.id}
                            href={problem.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 p-3 bg-secondary/50 border border-border rounded-lg hover:bg-secondary hover:border-primary/40 hover:shadow-md active:scale-95 transition-all group"
                        >
                            {/* Problem Number */}
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/20 rounded-lg font-bold text-xs text-primary group-hover:bg-primary/30 transition-colors">
                                {problem.number}
                            </div>

                            {/* Title */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                    {problem.title}
                                </p>
                            </div>

                            {/* Difficulty Badge */}
                            <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-full flex-shrink-0 ${
                                difficultyColor[problem.difficulty]
                            }`}>
                                {problem.difficulty}
                            </span>

                            {/* Solved Indicator */}
                            {problem.solved && (
                                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-success/20 rounded-full">
                                    <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}

                            {/* External Link Icon */}
                            <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <svg className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-muted-foreground text-sm font-medium">No problems match your search</p>
                    </div>
                )}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <button
                    onClick={() => setItemsToShow(prev => prev + 5)}
                    className="w-full py-2.5 px-4 bg-secondary/50 border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-secondary hover:border-primary/40 active:scale-95 transition-all"
                >
                    Load More Problems
                </button>
            )}

            {/* Empty State */}
            {MOCK_PROBLEMS.length === 0 && (
                <div className="text-center py-10">
                    <svg className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m0 0h6" />
                    </svg>
                    <p className="text-muted-foreground text-sm font-medium">No problems in history yet</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Start solving to build your history</p>
                </div>
            )}

            {/* Stats Footer */}
            <div className="pt-3 border-t border-border text-xs text-muted-foreground text-center font-medium">
                <p>
                    {filteredProblems.length} of {MOCK_PROBLEMS.filter((p) =>
                        p.title.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length} problems
                </p>
            </div>
        </div>
    );
}
