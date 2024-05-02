"use server"

import { signOut } from "@/auth"
export async function logout() {
    try {
        await signOut();
        return { ok: true };
    } catch (error) {
        console.error("Error logging out:", error);
        return { ok: false };
    }
}