import { useEffect, useState } from 'react'
import './App.css'
import GetStarted from './pages/GetStarted';
import SelectRepo from './pages/SelectRepo';
import TodayProblem from './pages/TodayProblem';

type View = "loading" | "getstarted" | "selectrepo" | "today";

export function App() {
  const [view, setView] = useState<View>("loading");

  useEffect(() => {
    chrome.storage.local.get(["authed", "repo"], (result) => {
      if (!result.authed) setView("getstarted");
      else if (!result.repo) setView("selectrepo");
      else setView("today");
    });
  }, []);

  if (view === "loading") return <div className="p-4">Loading...</div>;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background p-4 flex items-center justify-center">
      {view === "getstarted" && <GetStarted onNext={() => setView("selectrepo")} />}
      {view === "selectrepo" && <SelectRepo onNext={() => setView("today")} />}
      {view === "today" && <TodayProblem />}
    </div>
  );
}

export default App;
