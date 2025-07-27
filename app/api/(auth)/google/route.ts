import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const redirect = `${process.env.GOOGLE_REDIRECT_URI}`;
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const scope = encodeURIComponent("profile email");

  const url = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=${scope}`;

  return NextResponse.redirect(url);
}
