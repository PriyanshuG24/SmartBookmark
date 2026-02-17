"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function BookmarkForm() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!title.trim() || !url.trim()) {
            toast.error("Title and URL are required");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/bookmarks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title.trim(), url: url.trim() }),
            });

            if (response.ok) {
                toast.success("Bookmark added successfully!");
                setTitle("");
                setUrl("");
                setOpen(false);
            } else {
                const error = await response.json();
                toast.error(error.error || "Failed to add bookmark");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="btn-primary rounded-lg px-4 py-2 inline-flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white border border-gray-200 rounded-2xl p-0 overflow-hidden">
                <div className="bg-accent px-6 py-5 border-b border-gray-200">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                                <Plus className="w-4 h-4 text-primary" />
                            </span>
                            Add New Bookmark
                        </DialogTitle>
                        <p className="text-sm text-gray-600 mt-1">
                            Save a link so you can access it quickly later.
                        </p>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-800">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Supabase Documentation"
                            disabled={isLoading}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-800">
                            URL
                        </label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            disabled={isLoading}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            disabled={isLoading}
                            className="btn-primary flex-1 rounded-xl"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary flex-1 rounded-xl"
                        >
                            {isLoading ? "Adding..." : "Save Bookmark"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
