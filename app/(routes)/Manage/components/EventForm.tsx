"use client";

import { useState } from "react";

export default function EventForm({
	onSubmit,
}: {
	onSubmit: (events: any[]) => void;
}) {
	const [events, setEvents] = useState([
		{ id: Date.now(), date: "", title: "", venue: "", city: "", link: "" },
	]);

	// Add a new event form dynamically
	const addEventForm = () => {
		setEvents([
			...events,
			{
				id: Date.now(),
				date: "",
				title: "",
				venue: "",
				city: "",
				link: "",
			},
		]);
	};

	// Update an event field
	const updateEvent = (index: number, field: string, value: string) => {
		const newEvents = [...events];
		newEvents[index] = { ...newEvents[index], [field]: value };
		setEvents(newEvents);
	};

	// Remove an event form
	const removeEventForm = (index: number) => {
		setEvents(events.filter((_, i) => i !== index));
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(events);
		setEvents([
			{
				id: Date.now(),
				date: "",
				title: "",
				venue: "",
				city: "",
				link: "",
			},
		]); // Reset form
	};

	return (
		<div className="mt-4">
			<form onSubmit={handleSubmit}>
				{events.map((event, index) => (
					<div
						key={event.id}
						className="border p-4 rounded mb-4 relative"
					>
						<button
							type="button"
							onClick={() => removeEventForm(index)}
							className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
						>
							X
						</button>

						<input
							type="date"
							value={event.date}
							onChange={(e) =>
								updateEvent(index, "date", e.target.value)
							}
							className="w-full p-2 mb-2 border rounded"
							required
						/>
						<input
							type="text"
							placeholder="Title"
							value={event.title}
							onChange={(e) =>
								updateEvent(index, "title", e.target.value)
							}
							className="w-full p-2 mb-2 border rounded"
							required
						/>
						<input
							type="text"
							placeholder="Venue"
							value={event.venue}
							onChange={(e) =>
								updateEvent(index, "venue", e.target.value)
							}
							className="w-full p-2 mb-2 border rounded"
							required
						/>
						<input
							type="text"
							placeholder="City"
							value={event.city}
							onChange={(e) =>
								updateEvent(index, "city", e.target.value)
							}
							className="w-full p-2 mb-2 border rounded"
							required
						/>
						<input
							type="url"
							placeholder="Event Link"
							value={event.link}
							onChange={(e) =>
								updateEvent(index, "link", e.target.value)
							}
							className="w-full p-2 mb-2 border rounded"
							required
						/>
					</div>
				))}

				<button
					type="button"
					onClick={addEventForm}
					className="w-full bg-green-500 text-white p-2 rounded mt-2"
				>
					+ Add Another Event
				</button>

				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded mt-4"
				>
					Submit All Events
				</button>
			</form>
		</div>
	);
}
