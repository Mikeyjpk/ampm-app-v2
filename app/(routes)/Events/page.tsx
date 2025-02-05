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

// todo: add a 'show all' option for the auth user to see all events, letting them clear out old events in the db.

// add a clear all > to clear all events past a certain date

// add a clear all > clear all items from the db

const EventsPage = () => {
	const { data: session } = useSession();
	const [events, setEvents] = useState<Event[]>([]); // ✅ Specify event type explicitly
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showEventModal, setShowEventModal] = useState(false); // ✅ State to manage modal visibility

	// Fetch events
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await fetch("/api/events");
				if (!res.ok) throw new Error("Failed to fetch events");

				const data: Event[] = await res.json(); // ✅ Ensure TypeScript knows the expected structure
				setEvents(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

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
							className="border p-4 rounded mb-4 shadow"
						>
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
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default EventsPage;
