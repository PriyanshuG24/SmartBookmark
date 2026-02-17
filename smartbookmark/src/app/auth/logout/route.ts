import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = await createClient();

    try {
        await supabase.auth.signOut();

        const response = NextResponse.redirect(new URL("/login", request.url), {
            status: 302,
        });

        response.cookies.delete("sb-access-token");
        response.cookies.delete("sb-refresh-token");

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.redirect(new URL("/login", request.url), {
            status: 302,
        });
    }
}
