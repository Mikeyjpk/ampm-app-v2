"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaToolbox } from "react-icons/fa";

export default function ManagePage() {
	const { data: session, status } = useSession();
	// const router = useRouter();

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
				</div>
			) : (
				// If not authenticated, show sign-in button
				<div className="flex flex-col items-center gap-y-3">
					<p className="text-lg">Please sign in to continue</p>
					<button
						onClick={() => signIn("credentials")}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Sign In
					</button>
				</div>
			)}
		</div>
	);
}
