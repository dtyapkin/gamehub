import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/dist/client/script";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GameHub — Play Free Games Online",
  description:
    "Discover, play and enjoy thousands of free games. Action, Adventure, Racing, Sports, Puzzle and more!",
  keywords: [
    "games",
    "free games",
    "online games",
    "browser games",
    "yandex games",
  ],
  authors: [{ name: "GameHub" }],
  openGraph: {
    title: "GameHub — Play Free Games Online",
    description: "Discover, play and enjoy thousands of free games.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={inter.variable}>
      <body className="bg-dark min-h-screen">
        {children}
        <Script
          src="//an.yandex.ru/system/context.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
