"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManagePage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	// Debugging Logs
	console.log("Session Data:", session);
	console.log("Session Status:", status);

	// Handle unauthenticated users
	useEffect(() => {
		if (status === "unauthenticated") {
			console.log("Redirecting to /signin...");
			router.replace("/signin");
		}
	}, [status, router]);

	if (status === "loading") return <p>Loading...</p>;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			{session ? (
				<div className="bg-white p-6 rounded shadow-md w-96">
					<h1 className="text-lg font-bold mb-4">
						Welcome, {session.user?.email}!
					</h1>
					<p>You can now manage your events.</p>

					{/* 🔹 Sign Out Button */}
					<button
						onClick={() => signOut()}
						className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
					>
						Sign Out
					</button>
				</div>
			) : (
				<p>Redirecting to login...</p>
			)}
		</div>
	);
}
