import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing email or password");
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					throw new Error("User not found");
				}

				const isValid = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!isValid) {
					throw new Error("Invalid password");
				}

				return { id: user.id, email: user.email };
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	cookies: {
		sessionToken: {
			name: `next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax", // Ensures compatibility with mobile browsers
				secure: process.env.NODE_ENV === "production",
				path: "/",
			},
		},
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id; // Store the user ID in the token
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string; // 👈 Explicit type assertion
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
