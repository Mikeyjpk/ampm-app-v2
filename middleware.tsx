import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	const url = req.nextUrl;

	// 🔹 Automatically redirect `/manage` → `/Manage` (fix case sensitivity issue)
	if (url.pathname === "/manage") {
		return NextResponse.redirect(new URL("/Manage", req.url));
	}

	// 🔹 Define protected routes (case-sensitive)
	const protectedRoutes = ["/Manage"]; // ✅ Ensure correct capitalization

	// 🔹 Protect the `/Manage` route - Redirect to `/signin` if no token
	if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
		if (!token) {
			return NextResponse.redirect(new URL("/signin", req.url));
		}
	}

	return NextResponse.next();
}

// 🔹 Match Middleware to Specific Routes
export const config = {
	matcher: ["/manage", "/Manage/:path*"], // ✅ Handles both `/manage` & `/Manage`
};
