"use client";

import { useState, useEffect } from "react";
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaYoutube,
	FaTiktok,
	FaSpotify,
} from "react-icons/fa";

const Footer = () => {
	// Define color options

	return (
		<footer className="w-full flex flex-col items-center text-center select-none font-times py-8 gap-4">
			<div className="flex flex-col ">
				{/* Branding / Tagline */}
				<div className="text-lg tracking-wide uppercase">
					We Throw Parties for Sad Music
				</div>

				{/* Description */}
				<div className="text-sm tracking-[.06rem]">
					AM//PM is Australia&apos;s Biggest Touring Emo Night
				</div>
			</div>

			{/* Social Icons */}
			<div className="flex gap-6">
				{[
					FaFacebookF,
					FaTwitter,
					FaInstagram,
					FaYoutube,
					FaTiktok,
					FaSpotify,
				].map((Icon, index) => (
					<a
						key={index}
						href="#"
						className="hover:text-sky-400 transition-all duration-1000 ease-in-out text-xl"
					>
						<Icon />
					</a>
				))}
			</div>

			<div className="flex flex-col justify-center items-center gap-1">
				{/* Copyright */}
				<div className="text-xs opacity-70 ">
					© 2025 AM//PM Emo Night, The Neighbourhood
				</div>

				{/* Links */}
				<div className="flex gap-4 text-xs">
					<button className="hover:underline transition-all duration-1000 ease-in-out hover:text-sky-400">
						Privacy Policy
					</button>
					<span>|</span>
					<button className="hover:underline transition-all duration-1000 ease-in-out hover:text-sky-400">
						Terms &amp; Conditions
					</button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
