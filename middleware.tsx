import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const url = req.nextUrl;

	// 🔹 Automatically redirect `/manage` → `/Manage` (fix case sensitivity issue)
	if (url.pathname === "/manage") {
		return NextResponse.redirect(new URL("/Manage", req.url));
	}

	return NextResponse.next();
}

// 🔹 Match Middleware to Specific Routes
export const config = {
	matcher: ["/manage", "/Manage/:path*"], // ✅ Handles both `/manage` & `/Manage`
};
