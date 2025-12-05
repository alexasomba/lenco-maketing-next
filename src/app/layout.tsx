import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from 'fumadocs-ui/provider/next';
import { AISearch, AISearchTrigger, AISearchPanel } from '@/components/search';
import { createMetadata } from '@/lib/metadata';
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = createMetadata();

// Feature flag for AI search
const enableAskAI = process.env.NEXT_PUBLIC_ENABLE_ASK_AI === 'true';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
				<RootProvider>
					{enableAskAI ? (
						<AISearch>
							<AISearchTrigger />
							<AISearchPanel />
							{children}
						</AISearch>
					) : (
						children
					)}
				</RootProvider>
			</body>
		</html>
	);
}
