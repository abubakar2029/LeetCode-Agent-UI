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
        <div className="w-full max-w-md bg-background rounded-2xl shadow-xl overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 px-8 py-12">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-primary-foreground leading-tight">LeetCode Agent</h1>
                    <p className="text-primary-foreground/90 text-base font-light">Daily coding practice for students</p>
                </div>
            </div>

            {/* Content */}
            <div className="px-8 py-10 space-y-8">
                {/* Welcome Text - Left Aligned */}
                <div className="space-y-3 text-left">
                    <h2 className="text-2xl font-semibold text-foreground">Get Started</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Connect your GitHub account to unlock daily LeetCode problems and build a consistent coding habit with your peers.
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                    <div className="flex gap-4 text-left">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                            <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Daily Problems</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Get a fresh problem every morning</p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-left">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                            <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Track Progress</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Monitor your problem-solving streaks</p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-left">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                            <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Search History</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Browse all problems you have attempted</p>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={handleAuth}
                    className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 active:bg-primary/80 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zM5.5 10.5h4v4h1v-4h4v-1h-4v-4h-1v4h-4v1z" />
                    </svg>
                    Sign in with GitHub
                </button>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 bg-secondary/40 border-t border-border text-center text-xs text-muted-foreground font-medium">
                <p>Free • Secure • Built for Students</p>
            </div>
        </div>
    );
}
