"use client";

import { useState } from "react";
import ReactDOM from "react-dom";

const UploadEventModal = ({
	onClose,
	onSubmit,
}: {
	onClose: () => void;
	onSubmit: (events: any[]) => void;
}) => {
	const [events, setEvents] = useState([
		{ id: Date.now(), date: "", title: "", venue: "", city: "", link: "" },
	]);

	// Add new event
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

	// Remove an event
	const removeEventForm = (index: number) => {
		setEvents(events.filter((_, i) => i !== index));
	};

	// Submit events
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submitting events: ", events); // 🔹 Debugging log

		try {
			const res = await fetch("/api/events", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ events }),
			});

			const data = await res.json();
			console.log("Response from API:", data); // 🔹 Log API response

			if (!res.ok) {
				throw new Error(data.error || "Failed to add events.");
			}

			alert("Events added successfully! ✅");
			onClose();
		} catch (error) {
			console.error("Error submitting events:", error);
			alert("Failed to add events. ❌ Check console for details.");
		}
	};

	// Ensure modal is rendered outside the navbar (using a portal)
	const modalContent = (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			{/* Modal Container */}
			<div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto relative mx-4">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-2 right-2 bg-gray-300 text-black p-2 rounded-full hover:bg-gray-400"
				>
					✕
				</button>

				<h2 className="text-lg font-bold mb-4 text-center">
					Upload Events
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					{events.map((event, index) => (
						<div
							key={event.id}
							className="border p-4 rounded relative"
						>
							{/* Remove Button (Only show if more than one event exists) */}
							{events.length > 1 && (
								<button
									type="button"
									onClick={() => removeEventForm(index)}
									className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
								>
									X
								</button>
							)}

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

					{/* Add New Event Button */}
					<button
						type="button"
						onClick={addEventForm}
						className="w-full bg-green-500 text-white p-2 rounded"
					>
						+ Add Another Event
					</button>

					{/* Submit & Cancel Buttons */}
					<div className="flex justify-between mt-4">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-400 text-white px-4 py-2 rounded"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded"
						>
							Submit Events
						</button>
					</div>
				</form>
			</div>
		</div>
	);

	return ReactDOM.createPortal(modalContent, document.body);
};

export default UploadEventModal;
