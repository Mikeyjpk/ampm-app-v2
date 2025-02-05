import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";

const prisma = new PrismaClient();

// 🔹 GET: Retrieve all events
export async function GET() {
	try {
		const events = await prisma.event.findMany({
			orderBy: { date: "asc" },
		});

		return NextResponse.json(events, { status: 200 });
	} catch (error) {
		console.error("GET /events error:", error); // Log the error to avoid unused variable
		return NextResponse.json(
			{ error: "Failed to fetch events" },
			{ status: 500 }
		);
	}
}

// 🔹 POST: Create multiple events
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { events } = body;

		if (!events || !Array.isArray(events) || events.length === 0) {
			return NextResponse.json(
				{ error: "Invalid event data" },
				{ status: 400 }
			);
		}

		const newEvents = await prisma.event.createMany({
			data: events.map((event) => ({
				date: new Date(event.date),
				title: event.title,
				venue: event.venue,
				city: event.city,
				link: event.link,
			})),
		});

		return NextResponse.json(
			{ message: "Events created successfully", count: newEvents.count },
			{ status: 201 }
		);
	} catch (error) {
		console.error("POST /events error:", error); // Log the error
		return NextResponse.json(
			{ error: "Failed to create events" },
			{ status: 500 }
		);
	}
}

// 🔹 DELETE: Remove an event by ID (Only if logged in)
export async function DELETE(req: Request) {
	try {
		const session = await getServerSession(authOptions);

		// 🔹 Only allow logged-in users to delete events
		if (!session) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const { id } = await req.json();

		if (!id) {
			return NextResponse.json(
				{ error: "Event ID is required" },
				{ status: 400 }
			);
		}

		await prisma.event.delete({
			where: { id },
		});

		return NextResponse.json(
			{ message: "Event deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("DELETE /events error:", error); // Log the error
		return NextResponse.json(
			{ error: "Failed to delete event" },
			{ status: 500 }
		);
	}
}
