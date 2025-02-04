"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await signIn("credentials", {
			email,
			password,
			callbackUrl: "/Manage",
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded shadow-md w-80"
			>
				<h2 className="text-lg font-bold mb-4">Sign In</h2>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-2 mb-2 border rounded"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 mb-4 border rounded"
					required
				/>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded"
				>
					Sign In
				</button>
			</form>
		</div>
	);
}
