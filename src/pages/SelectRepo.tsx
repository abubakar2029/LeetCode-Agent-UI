import { API_BASE_URL } from "../config";

import { useEffect, useState } from "react";

interface Props {
  onNext: () => void;
}

export default function SelectRepo({ onNext }: Props) {
  const [repos, setRepos] = useState<string[]>([]);

  // useEffect(() => {
  //   console.log("In the Select Repo Page --------------------");


  //   chrome.storage.local.get("token", async ({ token }) => {
  //     const res = await fetch(`${API_BASE_URL}/auth/get-public-repo`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = await res.json();
  //     setRepos(data.repos || []);
  //   });
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      onNext();
    }, 2000);
  }, []);
  const handleSelect = async (repo: string) => {
    chrome.storage.local.get("token", async ({ token }) => {
      await fetch(`${API_BASE_URL}/auth/confirm-repo?repo_name=${repo}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      chrome.storage.local.set({ repo }, () => onNext());
    });
  };

  return (
    <div className="w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-8 py-8">
        <h1 className="text-xl font-bold text-primary-foreground">Select Repository</h1>
        <p className="text-primary-foreground/80 text-sm mt-2">Link your GitHub repository with LeetCode progress</p>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {repos.length > 0 ? (
          <ul className="space-y-3">
            {repos.map((repo, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSelect(repo)}
                  className="w-full text-left p-4 bg-secondary/50 border border-border rounded-lg hover:bg-secondary hover:border-primary transition-all flex items-center gap-3 group active:scale-95"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 100 2h-6a2 2 0 01-2-2V4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {repo}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">GitHub repository</p>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 mb-3">
              <svg className="w-6 h-6 text-primary animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground">Fetching repositories</p>
            <p className="text-xs text-muted-foreground mt-1">Please wait...</p>
          </div>
        )}
      </div>
    </div>
  );
}
