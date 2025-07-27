import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { connect } from "@/db/config";
import bcrypt from "bcryptjs";

export async function POST(req : NextRequest){
    try {
        await connect();

        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ email });

        if(!email && !password){
            return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
        }

        if(!user){
            return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
        }

        const genSalt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, genSalt);

        user.password = hashPassword;
        
        await user.save();

        return NextResponse.json({ success: true, message: "Password Updated." }, { status: 200 });
        
    } catch (error) {
        console.log("Could not send OTP:", error);
        return NextResponse.json({ success: false, message: "Failed to update password" }, { status: 500 });
    }

}