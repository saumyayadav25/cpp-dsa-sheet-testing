import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono} from "next/font/google";
import Script from 'next/script';
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import BotWidget from "@/components/BotWidget";
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSAMate",
  description:
    "All DSA questions in one place — DSAMate | DSA Practice is your ultimate destination for all DSA(Data Structures and Algorithms) questions with solutions in CPP. Comprehensive DSA Sheet to prepare for coding interviews with 450+ essential coding questions distributed topic-wise. Track your progress, filter by difficulty, status or platform like leetcode, gfg, hackerrank etc, and practice POTD to stay consistent. Perfect for students preparing for coding interviews and placements. Cpp DSA questions, Java DSA questions, Python DSA questions, and more. Join the community of learners and ace your coding interviews with DSAMate | DSA Practice Sheet | Cpp DSA questions | Cpp dsa sheet",
  icons: {
    icon: "/icons/icon-192.png", // Update if your icon is in a different location
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakarta.variable} font-sans`}>
        {children}
        <BotWidget />
        <Footer/>
      </body>
    </html>
  );
}