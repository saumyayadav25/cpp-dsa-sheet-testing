"use client";  

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer only on sign-in and sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/resetPassword") {
    return null;
  }

  return <Footer />;
}
