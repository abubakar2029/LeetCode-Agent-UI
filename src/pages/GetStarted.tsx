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
        <div className="w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-8 py-10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-primary-foreground">LeetCode Agent</h1>
                </div>
                <p className="text-primary-foreground/90 text-sm">Master algorithms with daily consistent practice</p>
            </div>

            {/* Content */}
            <div className="px-8 py-8 space-y-6">
                <div className="space-y-2 text-left">
                    <h2 className="text-xl font-bold text-foreground">Get Started</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Connect your GitHub account to sync your LeetCode progress and start solving one problem daily.
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                    <div className="flex gap-4 items-start text-left">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                            <svg className="w-3.5 h-3.5 text-primary font-bold" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Daily Problems</p>
                            <p className="text-xs text-muted-foreground">Fresh challenge every morning</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start text-left">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                            <svg className="w-3.5 h-3.5 text-primary font-bold" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Track Progress</p>
                            <p className="text-xs text-muted-foreground">Monitor your growth over time</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start text-left">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                            <svg className="w-3.5 h-3.5 text-primary font-bold" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Search History</p>
                            <p className="text-xs text-muted-foreground">Review all problems solved</p>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={handleAuth}
                    className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm3.5 7.5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1z" />
                    </svg>
                    Sign in with GitHub
                </button>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-secondary/40 border-t border-border text-center">
                <p className="text-xs text-muted-foreground font-medium">Secure. Fast. Free. Forever.</p>
            </div>
        </div>
    );
}
