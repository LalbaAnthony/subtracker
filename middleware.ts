import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get("better-auth.session_token");

    // If no session token and not on login page, redirect to login
    if (!sessionToken && request.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If session token, redirect away as appropriate
    if (sessionToken) {
        if (request.nextUrl.pathname === "/login") {
            return NextResponse.redirect(new URL("/profile", request.url));
        }

        if (request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)", // Apply to all paths except for /api, /_next/static, /_next/image, and /favicon.ico
    ],
};