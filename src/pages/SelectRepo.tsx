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
    <div className="w-full max-w-md bg-background rounded-2xl shadow-xl overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-primary/90 px-8 py-10">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary-foreground">Select Repository</h1>
          <p className="text-primary-foreground/90 text-sm font-light">Choose your repository to link with your LeetCode progress</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {repos.length > 0 ? (
          <ul className="space-y-3">
            {repos.map((repo, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSelect(repo)}
                  className="w-full text-left p-4 bg-secondary/60 border border-border rounded-xl hover:bg-secondary/80 hover:border-primary/50 active:bg-secondary transition-all flex items-center gap-4 group"
                >
                  <svg className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 100 2h-6a2 2 0 01-2-2V4z" />
                    <path d="M12.954 7a.5.5 0 00-.464.314l-1.5 4a.5.5 0 00.928.372l.36-.96h2.232l.36.96a.5.5 0 00.928-.372l-1.5-4a.5.5 0 00-.464-.314h-.96z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {repo}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12 flex flex-col items-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-border"></div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin"></div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Loading repositories</p>
              <p className="text-xs text-muted-foreground mt-1">Connecting to your account</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
