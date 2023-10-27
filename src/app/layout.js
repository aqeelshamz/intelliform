import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "IntelliForm",
	description: "Decentralized Form Creator in Web3",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="light">
			<head>
				<link rel="icon" href="/form.png" type="image/png" sizes="any" />
			</head>

			<body className={inter.className}>{children}</body>
		</html>
	);
}
