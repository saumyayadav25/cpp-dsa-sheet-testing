import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { connect } from "@/db/config";
import { generateOTP } from "@/lib/utils";
import { sendOtpEmail } from "@/lib/sendOTP";
import { apiLimiter, res } from "@/middleware/rateLiming";


export async function POST(req : NextRequest){
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
        const { email } = body;

        const user = await User.findOne({ email });

        if(!user){
            return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
        }

        const newOtp = generateOTP();
        await sendOtpEmail(email, newOtp);

        user.otp = newOtp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        return NextResponse.json({ success: true, message: "OTP sent to email." }, { status: 200 });
        
    } catch (error) {
        console.error("Could not sned OTP:", error);
        return NextResponse.json({ success: false, message: "Failed to sent OTP" }, { status: 500 });
    }

}