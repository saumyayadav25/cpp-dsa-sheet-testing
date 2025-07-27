import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { connect } from "@/db/config";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json({ success: false, message: "Email and OTP are required." }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user || user.isVerified === false) {
      return NextResponse.json({ success: false, message: "No user exists with this email." }, { status: 404 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ success: false, message: "Invalid OTP." }, { status: 401 });
    }

    const now = new Date();
    if (user.otpExpiry && user.otpExpiry < now) {
      return NextResponse.json({ success: false, message: "OTP has expired." }, { status: 410 });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    // Generate session token (JWT)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Set cookie
    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Email verified successfully." }, { status: 200 });

  } catch (error) {
    console.error("[OTP VERIFY ERROR]", error);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
