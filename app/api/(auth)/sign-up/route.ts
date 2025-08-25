import { NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { generateOTP } from "@/lib/utils";
import { connect } from "@/db/config";
import { sendOtpEmail } from "@/lib/sendOTP";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
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
    const { fullName, email, password, confirmPassword } = body;

    if (!fullName || !email || (!password && !confirmPassword)) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //check if existing user and if unverified
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified === true) {
      return NextResponse.json({ success: false, message: "Email is already registered." }, { status: 409 });
    }else{
      await User.deleteOne({ email });
    }

    // Generate OTP (6-digit)
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 
    
    // Save user with unverified status
    const user = await User.create({
      full_name : fullName,
      email,
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpiry,
    });

    await user.save();

    await sendOtpEmail(email, otp);

    //After a user sign up for first time no need to login again 
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

    return NextResponse.json({ success: true, message: "Signup successful. OTP sent to email." }, { status: 200 });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
