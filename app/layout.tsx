import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AppContainer from "./components/AppContainer";
import SessionProvider from "./components/SessionProvider"; // ✅ Import the new Client Component

const inter = Inter({
	variable: "--font-sans-serif",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "AM//PM",
	description: "Australia's biggest touring Emo Night",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} antialiased`}>
				<SessionProvider>
					{" "}
					{/* ✅ Wrap inside client SessionProvider */}
					{/* Background texture */}
					<div
						className="fixed inset-0 w-full h-screen bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none z-[9999]"
						style={{
							backgroundImage: "url('/images/background.jpg')",
						}}
					></div>
					<AppContainer>
						<Navbar />
						{children}
					</AppContainer>
				</SessionProvider>
			</body>
		</html>
	);
}
