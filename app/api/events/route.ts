import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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

		// Create multiple events at once
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
		return NextResponse.json(
			{ error: "Failed to create events" },
			{ status: 500 }
		);
	}
}
