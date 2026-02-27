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
        Easy: "bg-success text-white font-bold text-xs",
        Medium: "bg-warning text-white font-bold text-xs",
        Hard: "bg-destructive text-white font-bold text-xs",
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
                            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all group"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                    {problem.title}
                                </p>
                            </div>

                            <span className={`px-2 py-1 rounded-full flex-shrink-0 ${
                                difficultyColor[problem.difficulty]
                            }`}>
                                {problem.difficulty.charAt(0)}
                            </span>

                            {problem.solved && (
                                <svg className="w-4 h-4 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </a>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground text-sm font-medium">No problems found</p>
                    </div>
                )}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <button
                    onClick={() => setItemsToShow(prev => prev + 5)}
                    className="w-full py-2.5 px-4 border border-border rounded-lg text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-secondary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                    Load More
                </button>
            )}
        </div>
    );
}
