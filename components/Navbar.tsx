"use client";

// Wrapper component to ensure all existing imports of `Navbar` now render the new unified navbar (NavbarSheet)
// This preserves backward compatibility across pages still importing `@/components/Navbar`.

import NavbarSheet from "./NavbarSheet";

export default function Navbar(props: React.ComponentProps<typeof NavbarSheet>) {
  return <NavbarSheet {...props} />;
}