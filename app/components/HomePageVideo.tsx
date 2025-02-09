const HomePageVideo = () => {
	return (
		<div className="w-full h-screen overflow-visible relative">
			<video
				className="w-full h-full object-cover mix-blend-lighten"
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
