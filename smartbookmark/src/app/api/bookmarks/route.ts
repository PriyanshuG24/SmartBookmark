import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

function isValidUrl(value: string) {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

export async function GET() {
    const supabase = await createClient();

    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes.user;
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
    const supabase = await createClient();

    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes.user;
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const title = (body?.title ?? "").trim();
    const url = (body?.url ?? "").trim();

    console.log("POST request - User:", user.id);
    console.log("POST request - Title:", title);
    console.log("POST request - URL:", url);

    if (!title || !url) {
        return NextResponse.json(
            { error: "Title and URL are required" },
            { status: 400 },
        );
    }

    if (!isValidUrl(url)) {
        return NextResponse.json(
            { error: "Invalid URL (include http://...)" },
            { status: 400 },
        );
    }

    const { data, error } = await supabase
        .from("bookmarks")
        .insert([{ user_id: user.id, title, url }])
        .select("*")
        .single();

    console.log("Insert result - Data:", data);
    console.log("Insert result - Error:", error);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
}

export async function DELETE(request: Request) {
    const supabase = await createClient();

    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes.user;
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
}
