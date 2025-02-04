const HomePage = () => {
	return (
		<div className="flex flex-col">
			{/* video */}
			<div className="w-full h-screen overflow-visible relative">
				<video
					className="w-full h-full object-cover"
					src="/video/video.mp4"
					autoPlay
					muted
					loop
					playsInline
				/>
			</div>

			<footer className="w-full py-12 flex flex-col items-center text-center select-none">
				{/* Branding / Tagline */}
				<div className="text-sm font-semibold tracking-wide uppercase">
					We Throw Parties for Sad Music
				</div>

				{/* Description */}
				<div className="text-xs mt-2 opacity-80">
					AM//PM is Australia&apos;s Biggest Touring Emo Night
				</div>

				{/* Social Icons (Placeholder for Now) */}
				<div className="flex gap-4 mt-4">
					<div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-full">
						X
					</div>
					<div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-full">
						X
					</div>
					<div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-full">
						X
					</div>
					<div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-full">
						X
					</div>
					<div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-full">
						X
					</div>
					<div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-full">
						X
					</div>
					<div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-full">
						X
					</div>
				</div>

				{/* Copyright */}
				<div className="text-xs mt-4 opacity-70">
					© 2025 AM//PM Emo Night, The Neighbourhood
				</div>

				{/* Links */}
				<div className="flex gap-4 text-xs mt-1 opacity-80">
					<button className="hover:underline">Privacy Policy</button>
					<span>|</span>
					<button className="hover:underline">
						Terms &amp; Conditions
					</button>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;
