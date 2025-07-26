import { NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import { connect } from "@/db/config";
import { User } from "@/models/User.model";

export async function GET(req: Request) {
  await connect();

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code found" }, { status: 400 });
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI!,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    if (!accessToken) {
      return NextResponse.json({ error: "No access token" }, { status: 400 });
    }

    // 2. Fetch user profile
    const { data: githubUser } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const { data: emails } = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const primaryEmail = emails.find((e: any) => e.primary)?.email;

    // 3. Save to DB
    let user = await User.findOne({ email: primaryEmail });

    if (!user) {
      user = await User.create({
        email: primaryEmail,
        name: githubUser.name || githubUser.login,
        avatar: githubUser.avatar_url,
        provider: "github",
        isVerified: true,
      });
    }

    // 4. Create session JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
    res.cookies.set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("GitHub OAuth Error:", err);
    return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
  }
}
