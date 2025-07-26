import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "No token provided" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await dbConnect();
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
