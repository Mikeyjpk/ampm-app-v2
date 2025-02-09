"use client";

import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaYoutube,
	FaTiktok,
	FaSpotify,
} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { SiThreads } from "react-icons/si";

const Footer = () => {
	return (
		<footer className="w-full flex flex-col items-center text-center select-none font-times py-5 gap-y-1">
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

			<div className="flex flex-col justify-center items-center">
				{/* Copyright */}
				<div className="text-[0.5rem] opacity-70 tracking-[.02rem] font-sans">
					© 2025 AM//PM Emo Night, The Neighbourhood
				</div>

				{/* Links */}
				<div className="flex gap-1 text-[0.5rem] font-sans">
					<button className="hover:underline transition-all duration-1000 ease-in-out">
						Privacy Policy
					</button>
					<span className="text-[0.4rem] mt-0.5">|</span>
					<button className="hover:underline transition-all duration-1000 ease-in-out">
						Terms &amp; Conditions
					</button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
