"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaToolbox } from "react-icons/fa";

export default function ManagePage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	// Redirect unauthenticated users
	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace("/signin");
		} else if (status === "authenticated") {
			// Manually refresh the session to ensure it's updated
			router.replace("/manage");
		}
	}, [status, router]);

	if (status === "loading") return <p>Loading...</p>;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
			{session ? (
				<div className="flex flex-col justify-center items-center  gap-y-3">
					<h1 className="text-lg font-bold">Authenticated</h1>
					<FaToolbox size={40} />
					<p className="text-center text-sm">
						You can now access admin tools from any page
					</p>
				</div>
			) : (
				<p>Redirecting to login...</p>
			)}
		</div>
	);
}
