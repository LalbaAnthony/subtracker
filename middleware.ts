import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get("better-auth.session_token");

    if (!sessionToken && request.nextUrl.pathname.startsWith("/profile")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (sessionToken && request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    if (sessionToken && request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};