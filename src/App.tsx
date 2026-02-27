import { useEffect, useState } from 'react'
import './App.css'
import GetStarted from './pages/GetStarted';
import SelectRepo from './pages/SelectRepo';
import TodayProblem from './pages/TodayProblem';

type View = "loading" | "getstarted" | "selectrepo" | "today";

export function App() {
  const [view, setView] = useState<View>("loading");

  // useEffect(() => {
  //   chrome.storage.local.get(["authed", "repo"], (result) => {
  //     if (!result.authed) setView("getstarted");
  //     else if (!result.repo) setView("selectrepo");
  //     else setView("today");
  //   });
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      setView("getstarted");
    }, 2000);
  }, []);

  if (view === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4 flex items-center justify-center">
        <div className="w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
          <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-12 flex flex-col items-center gap-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-primary opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary to-accent opacity-10 animate-pulse animation-delay-1000"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-foreground animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-primary-foreground mb-2">LeetCode Agent</h2>
              <p className="text-sm text-primary-foreground/80">Loading your learning dashboard...</p>
            </div>
          </div>
          <div className="px-8 py-6 bg-secondary/30">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <p className="text-sm text-foreground font-medium">Initializing extension</p>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                <p className="text-sm text-muted-foreground">Preparing content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4 flex items-center justify-center">
      {view === "getstarted" && <GetStarted onNext={() => setView("selectrepo")} />}
      {view === "selectrepo" && <SelectRepo onNext={() => setView("today")} />}
      {view === "today" && <TodayProblem />}
    </div>
  );
}

export default App;
