"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EventForm from "./components/EventForm"; // ✅ Import EventForm component

export default function ManagePage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	// Redirect unauthenticated users
	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace("/signin");
		}
	}, [status, router]);

	if (status === "loading") return <p>Loading...</p>;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			{session ? (
				<div className="bg-white p-6 rounded shadow-md w-96">
					<h1 className="text-lg font-bold mb-4">Authenticated</h1>
					<p>You can now manage the app</p>
				</div>
			) : (
				<p>Redirecting to login...</p>
			)}
		</div>
	);
}
