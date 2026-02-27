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
        <div className="w-96 bg-background rounded-lg shadow-lg overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-8">
                <h1 className="text-2xl font-bold text-primary-foreground mb-2">LeetCode Agent</h1>
                <p className="text-primary-foreground/90 text-sm">Master algorithms with daily consistent practice</p>
            </div>

            {/* Content */}
            <div className="px-6 py-8 space-y-6">
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-foreground">Get Started</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Connect your GitHub account to link your LeetCode progress with your repositories and start solving problems daily.
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Daily Problems</p>
                            <p className="text-xs text-muted-foreground">Get a new problem every day</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Track Progress</p>
                            <p className="text-xs text-muted-foreground">Keep track of solved problems</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Search History</p>
                            <p className="text-xs text-muted-foreground">Browse all problems you've seen</p>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={handleAuth}
                    className="w-full bg-primary text-primary-foreground font-medium py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zM5.5 10.5h4v4h1v-4h4v-1h-4v-4h-1v4h-4v1z" />
                    </svg>
                    Sign in with GitHub
                </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-secondary/30 border-t border-border text-center text-xs text-muted-foreground">
                <p>Secure. Fast. Free. Forever.</p>
            </div>
        </div>
    );
}
