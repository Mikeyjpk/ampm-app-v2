"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EventForm from "./components/EventForm"; // ✅ Import EventForm component

export default function ManagePage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [message, setMessage] = useState("");

	// Redirect unauthenticated users
	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace("/signin");
		}
	}, [status, router]);

	// Handle submitting multiple events
	const handleEventSubmit = async (events: any[]) => {
		setMessage("");

		const res = await fetch("/api/events", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ events }), // 🔹 Send multiple events
		});

		if (res.ok) {
			setMessage("Events added successfully!");
		} else {
			const errorData = await res.json();
			setMessage(errorData.error || "Failed to add events.");
		}
	};

	if (status === "loading") return <p>Loading...</p>;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			{session ? (
				<div className="bg-white p-6 rounded shadow-md w-96">
					<h1 className="text-lg font-bold mb-4">
						Welcome, {session.user?.email}!
					</h1>
					<p>You can now manage your events.</p>

					{/* Event Form Component */}
					<EventForm onSubmit={handleEventSubmit} />

					{message && (
						<p className="mt-2 text-green-500">{message}</p>
					)}

					{/* Sign Out Button */}
					<button
						onClick={() => signOut({ callbackUrl: "/signin" })}
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
