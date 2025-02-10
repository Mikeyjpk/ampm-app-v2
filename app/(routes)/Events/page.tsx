"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TiDelete } from "react-icons/ti";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import EventCard from "./components/EventCard";

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
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
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
		console.log("Raw event date:", dateString); // Debugging log

		// Ensure dateString is in a recognizable format
		const date = dayjs(
			dateString,
			[
				"DD/MM/YYYY",
				"YYYY-MM-DD",
				"YYYY-MM-DDTHH:mm:ss.SSSZ",
				"MM/DD/YYYY", // Fallback for US-based browsers
			],
			false
		); // Disable strict mode for better compatibility

		// Check if date is valid
		if (!date.isValid()) {
			console.error("Invalid date format received:", dateString);
			return "Invalid Date";
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

	if (loading)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="w-10 h-10 border-4 border-neutral-600 border-t-white rounded-full animate-spin"></div>
			</div>
		);

	if (error) return <p className="text-red-500">Error: {error}</p>;

	return (
		<div className="flex flex-col items-center text-white min-h-screen w-full px-2 select-none ">
			<h1 className="text-3xl font-black mb-6 text-center mt-16 ">
				UPCOMING EVENTS
			</h1>

			{events.length === 0 ? (
				<p className="text-gray-300 text-lg text-center py-10">
					no events found.
				</p>
			) : (
				<ul className="w-full max-w-3xl space-y-3 pb-5">
					{events.map((event) => (
						<li
							key={event.id}
							className="block relative hover:shadow-xl"
						>
							<EventCard
								date={formatDateWithSuffix(event.date)}
								city={event.city}
								title={event.title}
								venue={event.venue}
								link={event.link}
							/>

							<button
								onClick={(e) => {
									e.preventDefault();
									handleDelete(event.id);
								}}
								className={`absolute top-0 right-3 ${
									session ? "block" : "hidden"
								}`}
							>
								<TiDelete
									size={24}
									className="text-red-600 hover:text-red-300"
								/>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default EventsPage;
