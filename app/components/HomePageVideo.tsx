"use client";

import { useState, useRef, useEffect } from "react";

const HomePageVideo = () => {
	const [isLoading, setIsLoading] = useState(true);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		// ✅ Ensure state updates when video is ready
		const handleCanPlay = () => {
			setIsLoading(false); // Ensure React updates state properly
			video
				.play()
				.catch((err) => console.error("Autoplay blocked:", err));
		};

		// ✅ Double-check state update after first render
		const handlePlaying = () => setIsLoading(false);
		const handleWaiting = () => setIsLoading(true);

		video.addEventListener("canplaythrough", handleCanPlay);
		video.addEventListener("playing", handlePlaying);
		video.addEventListener("waiting", handleWaiting);

		// ✅ Manually check if video is ready (fixes stale state issue)
		if (video.readyState >= 3) {
			handleCanPlay();
		}

		return () => {
			video.removeEventListener("canplaythrough", handleCanPlay);
			video.removeEventListener("playing", handlePlaying);
			video.removeEventListener("waiting", handleWaiting);
		};
	}, []);

	return (
		<div className="w-full h-screen overflow-hidden relative">
			{/* ✅ Show loading animation while video is buffering */}
			{isLoading && (
				<div className="absolute inset-0 flex flex-col justify-center items-center bg-black z-10 gap-10">
					<p className="text-white font-times text-sm">
						EMO NEVER SLEEPS
					</p>
					<div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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
<a href="https://www.vecteezy.com/vector-art/47544548-vintage-retro-woman-shocking">
	Vintage Retro Woman Shocking ... Vectors by Vecteezy
</a>;
