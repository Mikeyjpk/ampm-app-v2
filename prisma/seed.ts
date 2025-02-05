const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await bcrypt.hash("password123", 10); // Hash the password

	const user = await prisma.user.upsert({
		where: { email: "tom@milgate.com" }, // Ensure this matches the create email
		update: {},
		create: {
			email: "tom@milgate.com", // This should match the "where" clause
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
