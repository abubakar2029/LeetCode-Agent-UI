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
    <div className="w-96 bg-background rounded-lg shadow-lg overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-6">
        <h1 className="text-xl font-bold text-primary-foreground">Select Repository</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Choose your repository to link with your LeetCode progress</p>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {repos.length > 0 ? (
          <ul className="space-y-2">
            {repos.map((repo, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSelect(repo)}
                  className="w-full text-left p-3 bg-secondary border border-border rounded-lg hover:bg-secondary hover:border-primary/50 transition-all flex items-center gap-3 group"
                >
                  <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 100 2h-6a2 2 0 01-2-2V4z" />
                    <path d="M12.954 7a.5.5 0 00-.464.314l-1.5 4a.5.5 0 00.928.372l.36-.96h2.232l.36.96a.5.5 0 00.928-.372l-1.5-4a.5.5 0 00-.464-.314h-.96z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {repo}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading repositories...</p>
          </div>
        )}
      </div>
    </div>
  );
}
