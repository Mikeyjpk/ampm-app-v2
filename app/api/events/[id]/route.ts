import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params;

		console.log("Deleting event with ID:", id); // Debugging log

		// Delete event by ID
		await prisma.event.delete({
			where: { id },
		});

		return NextResponse.json(
			{ message: "Event deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting event:", error);
		return NextResponse.json(
			{ error: "Failed to delete event" },
			{ status: 500 }
		);
	}
}
