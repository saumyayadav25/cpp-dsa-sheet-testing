import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { connect } from "@/db/config";

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

    return NextResponse.json({ success: true, message: "OTP verified successfully." }, {status: 200});

  } catch (error) {
    console.error("[OTP VERIFY ERROR]", error);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
