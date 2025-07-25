import type { Metadata } from "next";
import { Inter, Roboto_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// Load Google fonts
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-geist-sans", // You can reuse geistSans variable name here
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono", // You can reuse geistMono variable name here
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSAMate",
  description:
    "All DSA questions in one place — DSAMate | DSA Practice is your ultimate destination for all DSA(Data Structures and Algorithms) questions with solutions in CPP. Comprehensive DSA Sheet to prepare for coding interviews with 450+ essential coding questions distributed topic-wise. Track your progress, filter by difficulty, status or platform like leetcode, gfg, hackerrank etc, and practice POTD to stay consistent. Perfect for students preparing for coding interviews and placements. Cpp DSA questions, Java DSA questions, Python DSA questions, and more. Join the community of learners and ace your coding interviews with DSAMate | DSA Practice Sheet | Cpp DSA questions | Cpp dsa sheet",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${robotoMono.variable} font-sans`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
