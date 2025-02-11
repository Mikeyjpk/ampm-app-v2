const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await bcrypt.hash("Emodenzel1", 10);

	const user = await prisma.user.upsert({
		where: { email: "Tom@theneighbourhood.me" },
		update: {},
		create: {
			email: "Tom@theneighbourhood.me",
			password: hashedPassword,
		},
	});

	console.log("Admin user created:", user);
}

// Run the seed script
main()
	.catch((e) => {
		console.error("Error seeding database:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
