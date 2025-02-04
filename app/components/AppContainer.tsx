interface AppContainerProps {
	children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
	return (
		<div className="max-w-4xl mx-auto h-screen relative">{children}</div>
	);
};

export default AppContainer;
