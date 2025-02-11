"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import UploadEventModal from "./UploadEventModal"; // ✅ Import modal
import { FaToolbox } from "react-icons/fa";

const Navbar: React.FC = () => {
	const { data: session } = useSession(); // 🔹 Get session data
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [showAdminDropdown, setShowAdminDropdown] = useState<boolean>(false);
	const [showEventModal, setShowEventModal] = useState<boolean>(false);

	const router = useRouter();

	const toggleOpen = () => setIsOpen((prev) => !prev);
	const toggleAdminDropdown = () => setShowAdminDropdown((prev) => !prev);

	const navTo = (route: string) => {
		switch (route) {
			case "HOME":
				router.push("/");
				break;
			case "UPCOMING EVENTS":
				router.push("/Events");
				break;
			case "PHOTO ALBUMS":
				// todo: replace when photo albums are set up
				// router.push("/Photos");
				window.location.href =
					"https://www.ampmemonight.com/pages/photos";
				break;
			case "MERCH STORE":
				// todo: replace when merch store set up
				// router.push("/Merch");
				window.location.href =
					"https://www.ampmemonight.com/pages/merch";
				break;
		}
		toggleOpen();
	};

	const handleSignOut = async () => {
		await signOut({ redirect: false });
		router.refresh();
	};

	// Disable scrolling when the menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	// Background expanding animation
	const menuVariants: Variants = {
		hidden: { height: "0vh", opacity: 0 },
		visible: {
			height: "100vh",
			opacity: 1,
			transition: { duration: 0.5, ease: "easeInOut" },
		},
		exit: {
			height: "0vh",
			opacity: 0,
			transition: { duration: 0.5, ease: "easeInOut" },
		},
	};

	// Staggered menu item animation
	const itemVariants: Variants = {
		hidden: { opacity: 0, y: -40 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: 0.4 + i * 0.3, duration: 0.3 },
		}),
	};

	return (
		<div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl flex justify-between items-center font-semibold z-50 px-6 py-3 bg-transparent select-none">
			{/* 🔹 Admin Tools (Only visible if logged in) */}
			{session && (
				<div className="relative">
					<button
						onClick={toggleAdminDropdown}
						className="text-white transition"
					>
						<FaToolbox size={26} className="mt-2" />
					</button>

					{/* Dropdown */}
					{showAdminDropdown && (
						<div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-md rounded">
							{/* Add Event Button */}
							<button
								onClick={() => {
									setShowEventModal(true);
									setShowAdminDropdown(false);
								}}
								className="block w-full text-left px-4 py-2"
							>
								Add Event
							</button>

							{/* Clear Old Events Button */}
							<button
								onClick={async () => {
									try {
										const res = await fetch(
											"/api/events/clear-old",
											{ method: "DELETE" }
										);
										const data = await res.json();
										alert(
											data.message ||
												"Old events cleared!"
										);
										setShowAdminDropdown(false);
										router.refresh(); // ✅ Refresh the page to update UI
									} catch (error) {
										console.error(
											"Error clearing old events:",
											error
										);
										alert("Failed to clear old events.");
									}
								}}
								className="block w-full text-left px-4 py-2"
							>
								Clear Old Events
							</button>

							{/* Sign Out Button */}
							<button
								onClick={handleSignOut}
								className="block w-full text-left px-4 py-2"
							>
								Sign Out
							</button>
						</div>
					)}
				</div>
			)}

			{/* Menu Toggle Button */}
			<button
				onClick={toggleOpen}
				className={`py-3 px-4 text-sm z-50 absolute right-2 top-3 ${
					isOpen ? "text-black hover:text-black/80" : "text-white"
				}`}
			>
				{isOpen ? <p>CLOSE</p> : <p>MENU</p>}
			</button>

			{/* Nav Menu */}
			{/* AnimatePresence ensures proper unmounting animations */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={menuVariants}
						className="fixed z-40 top-0 left-0 w-full h-screen bg-light flex flex-col justify-center items-center"
					>
						{/* Background image */}
						<div
							className="flex flex-col w-full h-full items-center justify-center object-fill max-w-lg"
							style={{
								backgroundImage:
									"url('/images/menu-background.png')",
								backgroundSize: "cover", // Ensures the image covers the entire div
								backgroundPosition: "center", // Centers the image
								backgroundRepeat: "no-repeat", // Prevents tiling
								imageRendering: "auto", // Ensures smooth scaling
							}}
						>
							{/* Menu Items */}
							{[
								"HOME",
								"UPCOMING EVENTS",
								"PHOTO ALBUMS",
								"MERCH STORE",
							].map((item, index) => (
								<motion.button
									key={index}
									variants={itemVariants}
									custom={index} // Pass index to animate sequentially
									initial="hidden"
									animate="visible"
									exit="hidden"
									className="my-3 py-2"
									onClick={() => navTo(item)}
								>
									<p className="text-black hover:text-sky-400 duration-700 text-2xl">
										{item}
									</p>
								</motion.button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Upload Event Modal (Renders Outside Navbar Using Portal) */}
			{showEventModal && (
				<UploadEventModal onClose={() => setShowEventModal(false)} />
			)}
		</div>
	);
};

export default Navbar;
