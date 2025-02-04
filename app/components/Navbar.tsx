"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const router = useRouter();

	const navTo = (route: string) => {
		switch (route) {
			case "HOME":
				router.push("/");
				break;
			case "UPCOMING EVENTS":
				router.push("/Events");
				break;
			case "PHOTO ALBUMS":
				router.push("/Photos");
				break;
			case "MERCH STORE":
				router.push("/Merch");
				break;
		}
		toggleOpen(); // Close menu after navigation
	};

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	// Disable scrolling when the menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		// Cleanup when component unmounts
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
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
		exit: {
			height: "0vh",
			opacity: 0,
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
	};

	// Staggered menu item animation
	const itemVariants: Variants = {
		hidden: { opacity: 0, y: -40 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.4 + i * 0.3, // Stagger delay for each item
				duration: 0.3,
			},
		}),
	};

	return (
		<div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl flex justify-end items-center font-semibold z-50">
			<button
				onClick={toggleOpen}
				className={`py-3 px-4 text-sm z-50 ${
					isOpen ? "text-black hover:text-black/80" : "text-white"
				}`}
			>
				{isOpen ? <p>CLOSE</p> : <p>MENU</p>}
			</button>

			{/* AnimatePresence ensures proper unmounting animations */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={menuVariants}
						className="fixed z-40 top-0 left-0 w-full h-screen bg-light flex flex-col justify-center items-center pb-16 bg-white"
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
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Navbar;
