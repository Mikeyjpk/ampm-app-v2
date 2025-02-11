"use client";

import { useState, useRef, useEffect } from "react";

const HomePageVideo = () => {
	const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
	const [showPlayButton, setShowPlayButton] = useState<boolean>(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleLoadedData = () => {
			setIsVideoLoaded(true);
		};

		const handleAutoplayError = (err: Error) => {
			console.error("Autoplay blocked:", err);
			setShowPlayButton(true);
		};

		const tryAutoplay = () => {
			video
				.play()
				.then(() => setShowPlayButton(false)) // Autoplay successful
				.catch(handleAutoplayError); // Autoplay failed
		};

		video.addEventListener("loadeddata", handleLoadedData);
		video.addEventListener("canplaythrough", tryAutoplay);

		if (video.readyState >= 3) {
			handleLoadedData();
			tryAutoplay();
		}

		return () => {
			video.removeEventListener("loadeddata", handleLoadedData);
			video.removeEventListener("canplaythrough", tryAutoplay);
		};
	}, []);

	const handlePlayClick = () => {
		const video = videoRef.current;
		if (!video) return;
		video.muted = false;
		video
			.play()
			.then(() => setShowPlayButton(false))
			.catch((err: Error) => console.error("Play failed:", err));
	};

	return (
		<div className="w-full h-screen overflow-hidden relative mix-blend-lighten">
			{/* Show PNG placeholder if video is not loaded */}
			{!isVideoLoaded && (
				<img
					src="/images/video-loader.png"
					alt="Loading Placeholder"
					className="absolute inset-0 w-full h-full object-cover bg-black"
				/>
			)}

			{/* Show "Tap to Play" button if autoplay is blocked */}
			{showPlayButton && isVideoLoaded && (
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
				className={`w-full h-full object-cover transition-opacity duration-700 ${
					isVideoLoaded ? "opacity-100" : "opacity-0"
				}`}
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
