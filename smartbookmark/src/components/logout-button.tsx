"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        try {
            const response = await fetch("/auth/logout", {
                method: "POST",
            });

            if (response.ok) {
                toast.success("Logged out successfully!");
                window.location.href = "/login";
            } else {
                toast.error("Failed to logout");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("An error occurred during logout");
        }
    }

    return (
        <Button
            onClick={handleLogout}
            className="bg-[#FFEDC7] hover:text-[#EB4C4C] border border-[#EB4C4C] rounded-lg px-4 py-2 text-sm font-medium gap-2 cursor-pointer"
        >
            <LogOut className="w-4 h-4" />
            Logout
        </Button>
    );
}
