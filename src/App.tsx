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
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-border"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-foreground font-medium">Loading</p>
            <p className="text-muted-foreground text-sm mt-1">Setting up your learning journey</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background/95 p-4 flex items-center justify-center">
      {view === "getstarted" && <GetStarted onNext={() => setView("selectrepo")} />}
      {view === "selectrepo" && <SelectRepo onNext={() => setView("today")} />}
      {view === "today" && <TodayProblem />}
    </div>
  );
}

export default App;
