"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaToolbox } from "react-icons/fa";

export default function ManagePage() {
	const { data: session, status } = useSession();

	// Local state for email, password, and error messages
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// Reset loading state if user logs out
	useEffect(() => {
		if (status === "unauthenticated") {
			setLoading(false); // ✅ Reset button state on logout
		}
	}, [status]);

	// Function to handle sign-in
	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null); // Reset error state

		const res = await signIn("credentials", {
			email,
			password,
			redirect: false, // Prevent redirect; handle errors manually
		});

		if (res?.error) {
			setError(res.error); // Display error message below the form
			setLoading(false);
		}
	};

	if (status === "loading") return <p>Loading...</p>;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
			{session ? (
				// If authenticated, show admin tools
				<div className="flex flex-col justify-center items-center gap-y-3">
					<h1 className="text-lg font-bold">User Authenticated</h1>
					<FaToolbox size={40} />
					<p className="text-center text-sm">
						You can now access admin tools from any page
					</p>
					<button
						onClick={() => signOut()}
						className="bg-red-500 text-white px-4 py-2 rounded mt-4"
					>
						Sign Out
					</button>
				</div>
			) : (
				// If not authenticated, show login form
				<div className="flex flex-col items-center gap-y-4">
					<p className="text-lg">Please sign in to continue</p>

					{/* Sign-In Form */}
					<form
						onSubmit={handleSignIn}
						className="flex flex-col gap-3 w-72"
					>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-2 border rounded text-black"
							required
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-2 border rounded text-black"
							required
						/>

						<button
							type="submit"
							disabled={loading}
							className={`w-full p-2 rounded ${
								loading
									? "bg-gray-400"
									: "bg-blue-500 hover:bg-blue-600"
							} text-white`}
						>
							{loading ? "Signing in..." : "Sign In"}
						</button>
					</form>

					{/* 🔹 Error message appears BELOW the form */}
					{error && (
						<p className="text-red-500 mt-2 text-sm text-center">
							{error}
						</p>
					)}
				</div>
			)}
		</div>
	);
}
