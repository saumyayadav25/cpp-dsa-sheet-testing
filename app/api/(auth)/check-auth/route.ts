import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/models/User.model";
import jwt from "jsonwebtoken";
import { connect } from "@/db/config";

export async function GET() {
  try {
    await connect();
  } catch (error) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const token = (await cookies()).get("session")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findById(decoded.id).select("_id full_name email avatar");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User found", loggedIn: true, user },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
