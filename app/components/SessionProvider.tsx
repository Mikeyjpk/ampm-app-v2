"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // ✅ Import NextAuth's Session type

export default function SessionProvider({
	children,
	session, // ✅ Explicitly type session
}: {
	children: React.ReactNode;
	session?: Session | null; // ✅ Ensure session is correctly typed
}) {
	return (
		<NextAuthSessionProvider session={session}>
			{children}
		</NextAuthSessionProvider>
	);
}
