import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const redirect = `${process.env.GOOGLE_REDIRECT_URI}`;
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const scope = encodeURIComponent("profile email");

  const url = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=${scope}`;

  const response = NextResponse.redirect(url);
  
  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
}
