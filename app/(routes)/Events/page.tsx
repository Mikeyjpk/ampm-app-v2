"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// 🔹 Define Event Type
interface Event {
	id: string;
	date: string;
	title: string;
	venue: string;
	city: string;
	link: string;
}

const EventsPage = () => {
	const { data: session } = useSession();
	const [events, setEvents] = useState<Event[]>([]); // 🔹 Now events have a proper type
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Fetch events
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await fetch("/api/events");
				if (!res.ok) throw new Error("Failed to fetch events");

				const data: Event[] = await res.json(); // 🔹 Ensure TypeScript knows it's an array of Event objects
				setEvents(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	// Delete event by ID
	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this event?")) return;

		try {
			const res = await fetch("/api/events", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			});

			if (!res.ok) throw new Error("Failed to delete event");

			// 🔹 Remove the deleted event from the UI
			setEvents(events.filter((event) => event.id !== id));
		} catch (err: any) {
			alert("Error: " + err.message);
		}
	};

	if (loading) return <p>Loading events...</p>;
	if (error) return <p className="text-red-500">Error: {error}</p>;

	return (
		<div className="flex flex-col items-center p-6">
			<h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

			{events.length === 0 ? (
				<p>No events found.</p>
			) : (
				<ul className="w-full max-w-2xl">
					{events.map((event) => (
						<li
							key={event.id}
							className="border p-4 rounded mb-4 shadow flex justify-between items-center"
						>
							<div>
								<h2 className="text-xl font-semibold">
									{event.title}
								</h2>
								<p className="text-gray-600">
									{new Date(event.date).toLocaleDateString()}
								</p>
								<p>
									{event.venue}, {event.city}
								</p>
								<a
									href={event.link}
									target="_blank"
									className="text-blue-500 underline"
								>
									Event Link
								</a>
							</div>

							{/* 🔹 Show Delete Button Only for Logged-in Users */}
							{session && (
								<button
									onClick={() => handleDelete(event.id)}
									className="bg-red-500 text-white px-3 py-1 rounded"
								>
									Delete
								</button>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default EventsPage;
