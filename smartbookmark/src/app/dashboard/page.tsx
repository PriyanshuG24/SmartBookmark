"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { BookmarkIcon } from "lucide-react";
import { Search } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";
import { BookmarkForm } from "@/components/bookmark-form";
import { BookmarkList } from "@/components/bookmark-list";

export default function DashboardPage() {
    const router = useRouter();
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string | null>("");

    useEffect(() => {
        async function getUser() {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                router.push("/login");
                return;
            }
            setUser(data.user);
        }
        getUser();
    }, [router]);
    if (!user) {
        return (
            <main className="min-h-screen bg-accent flex items-center justify-center p-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-center w-full max-w-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-accent">
            <header className="bg-primary border-b border-primary-light">
                <div className="w-full px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl border border-white bg-accent flex items-center justify-center shrink-0">
                                <BookmarkIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-semibold text-white">
                                    Welcome
                                </h1>
                                <p className="text-sm text-white/80">
                                    {user?.user_metadata?.full_name ||
                                        user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="shrink-0">
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </header>
            <div className="w-full px-4 py-8">
                <div className="mb-6">
                    <div className="flex flex-col gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
                                My Bookmarks
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Manage your personal bookmark collection
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search bookmarks..."
                                    value={searchQuery || ""}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <BookmarkForm />
                        </div>
                    </div>

                    <BookmarkList
                        userId={user.id}
                        searchQuery={searchQuery || ""}
                    />
                </div>
            </div>
        </main>
    );
}
