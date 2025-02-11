"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaTiktok,
	FaSpotify,
} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { SiThreads } from "react-icons/si";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";

export default function Footer() {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState("");

	const openDrawer = (type: "privacy" | "terms") => {
		setContent(type);
		setIsOpen(true);
	};

	return (
		<div
			className={`w-full flex flex-col items-center text-center select-none font-times py-5 gap-y-1 bg-white transition-all duration-300 ${
				isOpen ? "" : "mix-blend-difference"
			}`}
		>
			<div className="flex flex-col uppercase">
				{/* Branding / Tagline */}
				<div className="text-sm tracking-[.04rem]">
					We Throw Parties for Sad Music
				</div>

				{/* Description */}
				<div className="text-[0.5rem] tracking-[.06rem] -mt-1">
					AM//PM is Australia&apos;s Biggest Touring Emo Night
				</div>
			</div>

			{/* Social Icons */}
			<div className="flex gap-2.5">
				{[
					FaInstagram,
					FaFacebook,
					FaTiktok,
					MdOutlineMailOutline,
					SiThreads,
					FaSpotify,
					FaTwitter,
				].map((Icon, index) => (
					<a
						key={index}
						href="#"
						className="hover:scale-110 transition-all duration-700 ease-in-out text-md"
					>
						<Icon />
					</a>
				))}
			</div>

			{/* Copyright */}
			<div className="text-[0.5rem] opacity-70 tracking-[.02rem] font-sans">
				© 2025 AM//PM Emo Night, The Neighbourhood
			</div>

			{/* Links */}
			<div className="flex gap-1 text-[0.5rem] font-sans">
				<button
					className="hover:underline transition-all duration-500 ease-in-out"
					onClick={() => openDrawer("privacy")}
				>
					Privacy Policy
				</button>
				<span className="text-[0.4rem] mt-0.5">|</span>

				<button
					className="hover:underline transition-all duration-500 ease-in-out"
					onClick={() => openDrawer("terms")}
				>
					Terms &amp; Conditions
				</button>
			</div>

			{/* Drawer Modal */}
			{isOpen && (
				<motion.div
					initial={{ y: "100%" }}
					animate={{ y: 0 }}
					exit={{ y: "100%" }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className="fixed bottom-0 w-full h-1/2 bg-zinc-100 shadow-xl p-4 border-t border-gray-300 flex flex-col justify-center items-center"
				>
					{/* Close Button */}
					<button
						className="text-gray-600 hover:text-black text-xl"
						onClick={() => setIsOpen(false)}
					>
						✕
					</button>

					{/* Content */}
					<div className="overflow-auto p-2 text-sm text-gray-700">
						{content === "privacy" ? (
							<PrivacyPolicy />
						) : (
							<TermsAndConditions />
						)}
					</div>
				</motion.div>
			)}
		</div>
	);
}
