"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Bookmark, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface BookmarkItem {
    id: string;
    user_id?: string;
    title: string;
    url: string;
    created_at: string;
}

interface BookmarkListProps {
    userId: string;
    searchQuery: string | null;
}

export function BookmarkList({ userId, searchQuery }: BookmarkListProps) {
    const supabase = useMemo(() => createClient(), []);

    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchBookmarks = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/bookmarks");

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                console.error("Fetch error:", error);
                toast.error(error?.error || "Failed to fetch bookmarks");
                return;
            }

            const data = await response.json();
            setBookmarks(Array.isArray(data?.data) ? data.data : []);
        } catch (error) {
            console.error("Fetch exception:", error);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookmarks();
    }, [fetchBookmarks]);

    const filteredBookmarks = useMemo(() => {
        const q = (searchQuery || "").trim().toLowerCase();
        if (!q) return bookmarks;

        return bookmarks.filter((b) => {
            const title = (b.title || "").toLowerCase();
            const url = (b.url || "").toLowerCase();
            return title.includes(q) || url.includes(q);
        });
    }, [bookmarks, searchQuery]);

    useEffect(() => {
        if (!userId) return;

        let isActive = true;
        let channel: any = null;

        async function setup() {
            const { data: sessionRes, error: sessionErr } =
                await supabase.auth.getSession();

            if (!isActive) return;

            if (sessionErr) {
                console.error("getSession error:", sessionErr);
                return;
            }

            const accessToken = sessionRes.session?.access_token;
            if (!accessToken) {
                console.error("No access token found - realtime will fail!");
                return;
            }

            supabase.realtime.setAuth(accessToken);

            channel = supabase
                .channel(`bookmarks:${userId}`)
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: "bookmarks",
                        filter: `user_id=eq.${userId}`,
                    },
                    (payload) => {
                        if (!isActive) return;

                        if (payload.eventType === "INSERT") {
                            const next = payload.new as BookmarkItem;
                            setBookmarks((prev) => {
                                if (prev.some((b) => b.id === next.id))
                                    return prev;
                                return [next, ...prev];
                            });
                        }

                        if (payload.eventType === "DELETE") {
                            const oldRow = payload.old as { id: string };
                            setBookmarks((prev) =>
                                prev.filter((b) => b.id !== oldRow.id),
                            );
                        }
                    },
                )
                .subscribe();
        }

        setup();

        return () => {
            isActive = false;
            if (channel) supabase.removeChannel(channel);
        };
    }, [userId, supabase]);

    async function handleDelete(id: string) {
        setDeletingId(id);

        try {
            const response = await fetch(`/api/bookmarks?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Bookmark deleted successfully!");
            } else {
                const error = await response.json().catch(() => ({}));
                toast.error(error?.error || "Failed to delete bookmark");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setDeletingId(null);
        }
    }

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
                <p className="text-gray-600 mt-2">Loading bookmarks...</p>
            </div>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-12">
                <Bookmark className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No bookmarks yet
                </h3>
                <p className="text-gray-600">
                    Start by adding your first bookmark!
                </p>
            </div>
        );
    }

    if (filteredBookmarks.length === 0) {
        return (
            <div className="text-center py-12">
                <Bookmark className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No results
                </h3>
                <p className="text-gray-600">
                    No bookmarks match{" "}
                    <span className="font-medium text-gray-900">
                        “{searchQuery}”
                    </span>
                    .
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
                >
                    <div className="flex flex-col h-full">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 truncate">
                                {bookmark.title}
                            </h3>

                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-sm truncate block mt-1 hover:underline"
                            >
                                {bookmark.url}
                            </a>

                            <p className="text-gray-500 text-xs mt-2">
                                Added{" "}
                                {new Date(
                                    bookmark.created_at,
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-3">
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-surface border border-gray-200 hover:shadow-sm transition-shadow text-gray-700"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(bookmark.id)}
                                disabled={deletingId === bookmark.id}
                                className="rounded-lg border border-primary-lighter text-primary hover:bg-accent"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
