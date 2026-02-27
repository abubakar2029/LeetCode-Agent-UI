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
    <div className="w-96 bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
      {/* Header - Minimal */}
      <div className="bg-gradient-to-br from-primary to-primary/95 px-8 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-28 h-28 bg-accent rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        <div className="relative">
          <h1 className="text-2xl font-bold text-primary-foreground">Repository</h1>
          <p className="text-primary-foreground/85 text-xs font-medium mt-0.5">Choose to sync</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {repos.length > 0 ? (
          <ul className="space-y-2">
            {repos.map((repo, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSelect(repo)}
                  className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all group font-medium text-sm text-foreground group-hover:text-primary"
                >
                  {repo}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <div className="relative w-10 h-10 mx-auto mb-3">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin"></div>
            </div>
            <p className="text-sm font-medium text-foreground">Loading repos</p>
          </div>
        )}
      </div>
    </div>
  );
}
