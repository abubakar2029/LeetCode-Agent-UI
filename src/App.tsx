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
        <div className="w-96 bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
          <div className="bg-gradient-to-br from-primary to-primary/95 px-8 py-10 flex flex-col items-center gap-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-primary-foreground border-r-primary-foreground border-b-accent animate-spin"></div>
              </div>
              <h2 className="text-lg font-bold text-primary-foreground">LeetCode Agent</h2>
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
