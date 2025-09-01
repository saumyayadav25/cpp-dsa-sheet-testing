import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { User } from "@/models/User.model";
import { sendOtpEmail } from "@/lib/sendOTP";
import { generateOTP } from "@/lib/utils";
import { apiLimiter, res } from "@/middleware/rateLiming";


export async function POST(req: Request) {
  await connect();
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

  const { email } = await req.json();

  if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });

  const user = await User.findOne({ email });

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const newOtp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  user.otp = newOtp;
  user.otpExpiry = otpExpiry;
  await user.save();

  await sendOtpEmail(email, newOtp );

  return NextResponse.json({ message: "OTP resent" });
}
