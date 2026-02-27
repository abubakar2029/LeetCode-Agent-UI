import { useEffect } from "react";
import { API_BASE_URL } from "../config";

interface Props {
    onNext: () => void;
}

export default function GetStarted({ onNext }: Props) {


    // an additional check 
    // useEffect(() => {
    //     chrome.storage.local.get(["authed", "token"], (res) => {
    //         if (res.authed && res.token) onNext();
    //     });
    // }, []);
    useEffect(() => {
        setTimeout(() => {
                onNext();
        }, 2000);
    }, []);
    const handleAuth = async () => {
        chrome.identity.launchWebAuthFlow(
            {
                url: `${API_BASE_URL}/auth/login?client_id=${chrome.runtime.id}&redirect_uri=${encodeURIComponent(chrome.identity.getRedirectURL())}`,
                interactive: true
            },
            (redirectUrl) => {
                if (chrome.runtime.lastError || !redirectUrl) {
                    console.error("❌ Auth failed:", chrome.runtime.lastError);
                    return;
                }

                // Example: https://<EXT_ID>.chromiumapp.org/provider_cb?username=foo&email=bar&token=xyz
                const url = new URL(redirectUrl);
                console.log("URL:", url);
                const token = url.searchParams.get("token");
                const username = url.searchParams.get("username");
                const email = url.searchParams.get("email");
                const avatar_url = url.searchParams.get("avatar_url");

                if (!token) {
                    console.error("❌ No token found in redirect");
                    return;
                }

                const user = { username, email, avatar_url };

                chrome.storage.local.set(
                    { authed: true, token, user },
                    () => {
                        console.log("✅ Stored user:", user);
                        onNext();
                    }
                );
            }
        );
    };


    return (
        <div className="w-96 bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
            {/* Header - Minimal & Clean */}
            <div className="bg-gradient-to-br from-primary to-primary/95 px-8 py-12 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/50 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                <div className="relative">
                    <h1 className="text-3xl font-bold text-primary-foreground mb-1">LeetCode Agent</h1>
                    <p className="text-primary-foreground/85 text-sm font-medium">One problem daily</p>
                </div>
            </div>

            {/* Content - Simplified */}
            <div className="px-8 py-8 space-y-7">
                <div className="text-left">
                    <h2 className="text-lg font-bold text-foreground mb-1">Connect GitHub</h2>
                    <p className="text-xs text-muted-foreground">Sync your progress instantly</p>
                </div>

                {/* Features - Minimal */}
                <div className="space-y-2">
                    <div className="flex gap-3 items-center text-left">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        <p className="text-xs font-medium text-foreground">Fresh daily challenges</p>
                    </div>
                    <div className="flex gap-3 items-center text-left">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        <p className="text-xs font-medium text-foreground">Track your streak</p>
                    </div>
                    <div className="flex gap-3 items-center text-left">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        <p className="text-xs font-medium text-foreground">Solve history</p>
                    </div>
                </div>

                {/* Button - Energetic */}
                <button
                    onClick={handleAuth}
                    className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
                >
                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm3.5 7.5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z" />
                    </svg>
                    Sign in with GitHub
                </button>
            </div>

            {/* Footer - Clean */}
            <div className="px-8 py-3 text-center">
                <p className="text-xs text-muted-foreground">Free forever</p>
            </div>
        </div>
    );
}
