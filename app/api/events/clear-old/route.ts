import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";

const prisma = new PrismaClient();

// 🔹 DELETE: Remove all events that are older than 1 day past the event date
export async function DELETE() {
	try {
		const session = await getServerSession(authOptions);

		// Ensure only logged-in users can delete old events
		if (!session) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const today = new Date();
		today.setDate(today.getDate() - 1); // Events older than 1 day

		const deleteResult = await prisma.event.deleteMany({
			where: {
				date: { lt: today }, // Delete events before yesterday
			},
		});

		return NextResponse.json(
			{ message: `Deleted ${deleteResult.count} old events.` },
			{ status: 200 }
		);
	} catch (error) {
		console.error("DELETE /events/clear-old error:", error);
		return NextResponse.json(
			{ error: "Failed to delete old events" },
			{ status: 500 }
		);
	}
}
