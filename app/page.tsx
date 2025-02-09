import Footer from "./components/Footer";

const HomePage = () => {
	return (
		<div className="flex flex-col">
			// todo
			{/* video */}
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
			<Footer />
		</div>
	);
};

export default HomePage;
