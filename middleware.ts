import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of restricted paths
const restrictedPaths = [
  "/quiz",
  "/notes",
  "/progress",
  "/cp-tracker",
  "/profile",
  "/timequiz",
  "/sheet",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for a restricted path
  if (restrictedPaths.some(path => pathname.startsWith(path))) {
    const session = request.cookies.get("session");

    if (!session) {
      // Redirect to sign-in with returnUrl
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

// Specify which paths to run middleware on
export const config = {
  matcher: [
    "/quiz/:path*",
    "/notes/:path*",
    "/progress/:path*",
    "/cp-tracker/:path*",
    "/profile/:path*",
    "/timequiz/:path*",
    "/sheet/:path*", 
  ],
};