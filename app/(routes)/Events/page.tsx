"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdOutlineDeleteForever } from "react-icons/md";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

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
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Fetch events
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await fetch("/api/events");
				if (!res.ok) throw new Error("Failed to fetch events");

				const data: Event[] = await res.json();
				setEvents(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	const handleDelete = async (eventId: string) => {
		if (!confirm("Are you sure you want to delete this event?")) return;

		try {
			const res = await fetch(`/api/events/${eventId}`, {
				method: "DELETE",
			});

			if (!res.ok) {
				throw new Error("Failed to delete event");
			}

			// Remove event from state after successful deletion
			setEvents(events.filter((event) => event.id !== eventId));
		} catch (error) {
			console.error("Error deleting event:", error);
		}
	};

	function formatDateWithSuffix(dateString: string): string {
		const date = dayjs(dateString, "MM/DD/YYYY"); // Adjust format if needed
		if (!date.isValid()) {
			throw new Error("Invalid date");
		}

		const day = date.date();
		const month = date.format("MMMM"); // Full month name

		// Function to get the correct ordinal suffix
		const getOrdinalSuffix = (day: number): string => {
			if (day >= 11 && day <= 13) return "th"; // Special cases for 11th, 12th, 13th
			switch (day % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		};

		return `${day}${getOrdinalSuffix(day)} ${month}`;
	}

	if (loading) return <p>Loading events...</p>;
	if (error) return <p className="text-red-500">Error: {error}</p>;

	return (
		<div className="flex flex-col items-center bg-black text-white min-h-screen w-full px-4 select-none">
			<h1 className="text-3xl font-black mb-6 text-center mt-16">
				UPCOMING EVENTS
			</h1>

			{events.length === 0 ? (
				<p className="text-gray-300 text-lg text-center">
					No events found.
				</p>
			) : (
				<ul className="w-full max-w-3xl space-y-4">
					{events.map((event) => (
						<li
							key={event.id}
							className="relative flex flex-col gap-3 p-4 bg-neutral-900 shadow-lg border border-neutral-700 rounded-2xl transition-all hover:shadow-xl"
						>
							{/* Top Row: Date + Venue */}
							<div className="flex justify-between items-center">
								{/* Venue & City */}
								<p className="text-gray-400 text-xs">
									📍 {event.venue} // {event.city}
								</p>

								{/* Date Badge */}
								<span className="bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-lg">
									{formatDateWithSuffix(
										new Date(
											event.date
										).toLocaleDateString()
									)}
								</span>
							</div>

							{/* Event Title */}
							<h2 className="text-xl font-semibold text-white">
								{event.title}
							</h2>

							{/* Event Link */}
							<a
								href={event.link}
								target="_blank"
								className="inline-block mt-2 text-blue-400 hover:text-blue-300 transition duration-300"
							>
								🔗 View Event
							</a>

							{/* ✅ Keep Delete Button Separate from Layout
							{session && (
								<div className="flex justify-end mt-2">
									<button
										onClick={() => handleDelete(event.id)}
										className="bg-red-600 rounded-xl p-2"
									>
										<MdOutlineDeleteForever
											className="text-white"
											size={18}
										/>
									</button>
								</div>
							)} */}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default EventsPage;
