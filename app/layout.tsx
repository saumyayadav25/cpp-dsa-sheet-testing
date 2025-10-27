import type { Metadata, Viewport } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FooterWrapper from "@/components/FooterWrapper";
import BotWidget from "@/components/BotWidget";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "@/components/ScrollToTopBottom";
import ScrollToTopBottom from "@/components/ScrollToTopBottom";
import { QuestionProvider } from "@/contexts/QuestionContext";
import StreakProvider from "@/components/StreakProvider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Temporarily commented out due to build issues with Turbopack
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: "DSAMate v2 - Your Ultimate DSA Practice Platform",
    template: "%s | DSAMate v2"
  },
  description:
    "Master Data Structures & Algorithms with DSAMate v2. 450+ curated DSA problems with solutions, progress tracking, smart filters, and daily POTD. Perfect for coding interviews, placements, and competitive programming. Join 3000+ developers mastering DSA.",
  keywords: [
    "DSA practice",
    "Data Structures and Algorithms",
    "coding interview preparation",
    "leetcode problems",
    "competitive programming",
    "DSA sheet",
    "coding questions",
    "algorithm practice",
    "programming interview",
    "CPP DSA",
    "Java DSA",
    "Python DSA",
    "GeeksforGeeks",
    "HackerRank",
    "SPOJ",
    "coding ninjas"
  ],
  authors: [{ name: "DSAMate Team" }],
  creator: "DSAMate",
  publisher: "DSAMate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dsamate-v2.vercel.app",
    siteName: "DSAMate v2",
    title: "DSAMate v2 - Your Ultimate DSA Practice Platform",
    description: "Master Data Structures & Algorithms with 450+ curated problems, progress tracking, and smart filters. Join 3000+ developers mastering DSA for coding interviews.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "DSAMate v2 - DSA Practice Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DSAMate v2 - Your Ultimate DSA Practice Platform",
    description: "Master Data Structures & Algorithms with 450+ curated problems, progress tracking, and smart filters. Join 3000+ developers mastering DSA.",
    images: ["/og-image.svg"],
    creator: "@dsamate",
  },
  icons: {
    icon: [

      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple/apple-touch-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/icons/apple/apple-touch-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/icons/apple/apple-touch-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/apple/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/icons/apple/apple-touch-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/icons/apple/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/icons/apple/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icons/apple/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/apple/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#3b82f6" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://dsamate-v2.vercel.app"),
  alternates: {
    canonical: "/",
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="DSAMate v2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DSAMate v2" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Additional Favicon Links */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple/apple-touch-icon-180x180.png" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileImage" content="/icons/microsoft/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/icons/microsoft/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/icons/microsoft/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/icons/microsoft/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/icons/microsoft/mstile-310x310.png" />

        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/favicon.svg" color="#3b82f6" />

        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${plusJakarta.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QuestionProvider>
            <StreakProvider />
            {children}
            <ScrollToTopBottom />
          </QuestionProvider>
        </ThemeProvider>
        <BotWidget />
        <FooterWrapper />
      </body>
    </html>
  );
}
