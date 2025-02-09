"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaToolbox } from "react-icons/fa";

export default function ManagePage() {
	const { data: session, status } = useSession();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// ✅ Reset loading state when session status updates
	useEffect(() => {
		if (status === "authenticated" || status === "unauthenticated") {
			setLoading(false);
		}
	}, [status]);

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (res?.error) {
			setError(res.error);
			setLoading(false);
		}
	};

	if (loading)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="w-10 h-10 border-4 border-neutral-600 border-t-white rounded-full animate-spin"></div>
			</div>
		);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white mix-blend-lighten">
			{session ? (
				<div className="flex flex-col justify-center items-center gap-y-3">
					<h1 className="text-lg font-bold">User Authenticated</h1>
					<FaToolbox size={40} />
					<p className="text-center text-sm">
						You can now access admin tools from any page
					</p>
				</div>
			) : (
				<div className="flex flex-col items-center gap-y-4">
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
							className={`w-full p-2 rounded text-white ${
								loading
									? "bg-gray-400"
									: "bg-neutral-600 hover:bg-neutral-500"
							}
									${loading ? "cursor-wait" : "cursor-pointer"} `}
						>
							{loading ? "Signing In.." : "Sign In"}
						</button>
					</form>

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
