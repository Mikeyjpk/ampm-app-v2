"use client";

import { useState, useRef, useEffect } from "react";

const HomePageVideo = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [showPlayButton, setShowPlayButton] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		// ✅ Ensure state updates when video is fully loaded
		const handleLoadedData = () => {
			setIsLoading(false);
		};

		// ✅ Handle autoplay failure (e.g., due to browser restrictions)
		const handleAutoplayError = (err: any) => {
			console.error("Autoplay blocked:", err);
			setShowPlayButton(true);
		};

		// ✅ Attempt to autoplay when video is loaded
		const tryAutoplay = () => {
			video
				.play()
				.then(() => setShowPlayButton(false)) // Autoplay successful
				.catch(handleAutoplayError); // Autoplay failed
		};

		// ✅ Double-check state update after first render
		video.addEventListener("loadeddata", handleLoadedData);
		video.addEventListener("canplaythrough", tryAutoplay);
		video.addEventListener("playing", () => setIsLoading(false));

		// ✅ Manually check if video is ready
		if (video.readyState >= 3) {
			handleLoadedData();
			tryAutoplay();
		}

		return () => {
			video.removeEventListener("loadeddata", handleLoadedData);
			video.removeEventListener("canplaythrough", tryAutoplay);
			video.removeEventListener("playing", () => setIsLoading(false));
		};
	}, []);

	// Handle manual play button click
	const handlePlayClick = () => {
		const video = videoRef.current;
		if (!video) return;
		video.muted = false; // Unmute if user interacts
		video.play().catch((err) => console.error("Play failed:", err));
		setShowPlayButton(false);
	};

	return (
		<div className="w-full h-screen overflow-hidden relative">
			{/* Show loading animation while video is loading */}
			{isLoading && (
				<div className="absolute inset-0 flex flex-col justify-center items-center bg-black z-10 gap-10">
					<p className="text-white font-times text-sm">
						EMO NEVER SLEEPS
					</p>
					<div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
				</div>
			)}

			{/* Show "Tap to Play" button if autoplay is blocked */}
			{showPlayButton && !isLoading && (
				<div className="absolute inset-0 flex justify-center items-center bg-black/50 z-10">
					<button
						onClick={handlePlayClick}
						className="bg-white text-black px-6 py-2 font-bold text-lg rounded-md shadow-lg"
					>
						Tap to Play ▶
					</button>
				</div>
			)}

			{/* 🎥 Video Element */}
			<video
				ref={videoRef}
				className="w-full h-full object-cover"
				src="/video/video.mp4"
				autoPlay
				muted
				loop
				playsInline
			/>
		</div>
	);
};

export default HomePageVideo;
