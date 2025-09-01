import { NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { generateOTP } from "@/lib/utils";
import { connect } from "@/db/config";
import { sendOtpEmail } from "@/lib/sendOTP";
import bcrypt from "bcryptjs";
import { apiLimiter, res } from "@/middleware/rateLiming";

export async function POST(req: Request) {
  try {
    // Wait for the rate limiter to process the request
    const rateLimitResult = await new Promise((resolve) => {
      apiLimiter(req as any, res as any, (next: any) => {
        resolve(next);
      });
    });

    // If rateLimitResult is not undefined, it means the rate limit was hit
    if (rateLimitResult) {
      console.log("rate :", rateLimitResult);
      return NextResponse.json(
        { message: "Too many requests, please try again later." },
        { status: 429 }
      );
    }
    await connect();

    const body = await req.json();
    const { email, password } = body;

    if (!email && !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser || existingUser.isVerified === false) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const comparePass = await bcrypt.compare(password, existingUser.password);

    if (!comparePass) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 409 }
      );
    }

    const newOtp = generateOTP();

    await sendOtpEmail(email, newOtp);

    existingUser.otp = newOtp;
    existingUser.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await existingUser.save();

    return NextResponse.json(
      { success: true, message: "Signin successful. OTP sent to email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
