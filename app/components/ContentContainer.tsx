"use state";

interface ContentContainerProps {
	children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
	return (
		<div
			className="
            mx-auto
            px-2
            sm:px-4
            md:px-6
            lg:px-8
            h-screen
        "
		>
			{children}
		</div>
	);
};

export default ContentContainer;
