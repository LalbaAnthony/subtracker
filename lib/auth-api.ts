import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getAuthUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return null;
    }

    return session.user;
}

export async function requireAuth() {
    const user = await getAuthUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    return user;
}