import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import {
    Bookmark,
    Plus,
    Shield,
    Trash2,
    RefreshCw,
    Search,
    Sparkles,
    Check,
    ExternalLink,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (data.user) {
        return (
            <main className="min-h-screen bg-accent flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
                        <div className="mx-auto mb-5 w-14 h-14 rounded-xl border border-gray-200 bg-surface flex items-center justify-center">
                            <Bookmark className="w-7 h-7 text-primary" />
                        </div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Welcome back
                        </h1>
                        <p className="text-gray-600 mt-2 mb-6">
                            Your bookmarks are waiting in the dashboard.
                        </p>

                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center w-full rounded-lg btn-primary px-6 py-3 font-medium"
                        >
                            Go to Dashboard
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>

                        <p className="text-xs text-gray-500 mt-4">
                            Tip: pin important links and find them instantly.
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-accent text-gray-900">
            <div className="container mx-auto px-4 py-10 ">
                <div className="flex items-center justify-between border-b border-[#EB4C4C] pb-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-semibold tracking-tight"
                    >
                        <span className="w-9 h-9 rounded-xl bg-white border border-[#EB4C4C] flex items-center justify-center shadow-sm">
                            <Bookmark className="w-5 h-5 text-[#EB4C4C]" />
                        </span>
                        <span className="text-gray-900">SmartBookmark</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center rounded-lg btn-secondary btn-secondary-hover  px-4 py-2 text-sm font-medium text-primary"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center rounded-lg btn-primary btn-primary-hover px-4 py-2 text-sm font-medium"
                        >
                            Get started
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
                <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-3 py-1 text-sm shadow-sm">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-gray-700">
                                Private bookmark manager with Google sign-in
                            </span>
                        </div>

                        <h1 className="mt-5 text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-gray-900">
                            Save links fast.
                            <span className="block text-primary">
                                Find them even faster.
                            </span>
                        </h1>

                        <p className="mt-4 text-lg text-gray-600 max-w-xl">
                            SmartBookmark keeps your important URLs organized,
                            searchable, and synced — without clutter.
                        </p>

                        <div className="mt-7 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center rounded-lg btn-primary px-6 py-3 font-medium"
                            >
                                Sign in with Google
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>

                            <a
                                href="#how"
                                className="inline-flex items-center justify-center rounded-lg btn-secondary btn-secondary-hover px-6 py-3 font-medium text-primary"
                            >
                                See how it works
                            </a>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <span className="inline-flex items-center gap-2">
                                <Check className="w-4 h-4 text-accent" />
                                No passwords
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Check className="w-4 h-4 text-accent" />
                                Private by default
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Check className="w-4 h-4 text-accent" />
                                Real-time sync
                            </span>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-700">
                                Dashboard preview
                            </div>
                            <div className="text-xs text-primary">
                                Search • Add • Delete
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-surface px-3 py-2 mb-4">
                                <Search className="w-4 h-4 text-gray-500" />
                                <div className="text-sm text-gray-500">
                                    Search bookmarks...
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "Supabase Auth Docs",
                                        time: "2 hours ago",
                                    },
                                    {
                                        title: "Next.js Routing Guide",
                                        time: "2 days ago",
                                    },
                                    {
                                        title: "Design Inspiration Board",
                                        time: "1 week ago",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
                                    >
                                        <div className="flex flex-col h-full">
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-primary">
                                                    {item.title}
                                                </div>
                                                <div className="mt-1 text-sm text-gray-600">
                                                    Added {item.time}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-2 mt-3">
                                                <a
                                                    href="#"
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface border border-gray-200 hover:shadow-sm transition-shadow text-gray-700"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-lg border border-primary-lighter text-primary hover:bg-accent"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex gap-3">
                                <button className="flex-1 rounded-lg btn-primary px-4 py-3 font-medium inline-flex items-center justify-center">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add bookmark
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <section id="how" className="mt-16">
                    <div className="w-full mx-auto">
                        <div className="flex items-end justify-between gap-6 flex-wrap">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                                    How it works
                                </h2>
                                <p className="mt-2 text-gray-600">
                                    Three simple actions — and your bookmarks
                                    stay organized.
                                </p>
                            </div>

                            <Link
                                href="/login"
                                className="inline-flex items-center text-sm font-medium text-accent hover:underline"
                            >
                                Start now{" "}
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>

                        <div className="mt-8 grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Plus,
                                    title: "Add",
                                    desc: "Save a URL with a title. Keep it quick and clean.",
                                },
                                {
                                    icon: RefreshCw,
                                    title: "Sync",
                                    desc: "Updates appear instantly across sessions and devices.",
                                },
                                {
                                    icon: Search,
                                    title: "Find",
                                    desc: "Search and open links without digging through tabs.",
                                },
                            ].map((s) => (
                                <div
                                    key={s.title}
                                    className="btn-secondary btn-secondary-hover border border-gray-200 rounded-2xl p-6 shadow-sm"
                                >
                                    <div className="w-11 h-11 rounded-xl border border-gray-200 bg-surface flex items-center justify-center">
                                        <s.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold ">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="mt-16">
                    <div className="w-full mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                            Built for clarity
                        </h2>
                        <p className="mt-2 text-gray-600 max-w-2xl">
                            Everything is minimal, private, and focused on speed
                            — not distractions.
                        </p>

                        <div className="mt-8 grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Shield,
                                    title: "Private & secure",
                                    desc: "Only you can access your bookmark collection.",
                                },
                                {
                                    icon: Trash2,
                                    title: "Easy management",
                                    desc: "Remove links in one click. Keep it tidy.",
                                },
                                {
                                    icon: RefreshCw,
                                    title: "Real-time updates",
                                    desc: "No refresh needed — changes appear instantly.",
                                },
                                {
                                    icon: Bookmark,
                                    title: "Google authentication",
                                    desc: "Login is fast, secure, and password-free.",
                                },
                            ].map((f) => (
                                <div
                                    key={f.title}
                                    className="border border-[#EB4C4C] rounded-2xl p-6 shadow-sm flex gap-4"
                                >
                                    <div className="w-11 h-11 shrink-0 rounded-xl border border-[#EB4C4C] bg-surface flex items-center justify-center">
                                        <f.icon className="w-5 h-5 text-[#EB4C4C]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {f.title}
                                        </h3>
                                        <p className="mt-1 text-gray-600">
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="mt-16">
                    <div className="w-full mx-auto">
                        <div className="bg-surface white border border-[#EB4C4C] rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                                    Ready to clean up your links?
                                </h2>
                                <p className="mt-2 text-gray-600 max-w-xl">
                                    Sign in with Google and start saving
                                    bookmarks in seconds.
                                </p>
                            </div>
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center rounded-lg btn-primary px-6 py-3 font-medium"
                            >
                                Sign in with Google
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </section>

                <footer className="mt-16 border-t border-[#EB4C4C] py-10">
                    <div className="w-full mx-auto px-0 flex items-center justify-center gap-6">
                        <div className="text-sm text-gray-600">
                            <div className="font-medium text-gray-900 text-center">
                                SmartBookmark
                            </div>
                            <div className="mt-1 text-center">
                                Minimal bookmark manager • Built with Supabase +
                                Next.js
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}
