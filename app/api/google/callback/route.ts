import { NextResponse } from "next/server";
import axios from "axios";
import { connect } from "@/db/config";
import { User } from "@/models/User.model";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  await connect();

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    const errorResponse = NextResponse.json({ error: "No code found" }, { status: 400 });
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    errorResponse.headers.set('Access-Control-Allow-Credentials', 'true');
    return errorResponse;
  }

  try {
    // 1. Exchange code for tokens
    const { data: tokens } = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // 2. Get user profile
    const { data: profile } = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    // 3. Find or create user in DB
    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        email: profile.email,
        name: profile.name,
        avatar: profile.picture,
        provider: "google",
        isVerified: true,
      });
    }

    // 4. Create JWT manually here
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // 5. Set session cookie and redirect
    const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
    
    // Add CORS headers
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    
    res.cookies.set("session", token, {
      httpOnly: true,
       secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("OAuth Error:", err);
    const errorResponse = NextResponse.json({ error: "OAuth failed" }, { status: 500 });
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    errorResponse.headers.set('Access-Control-Allow-Credentials', 'true');
    return errorResponse;
  }
}
