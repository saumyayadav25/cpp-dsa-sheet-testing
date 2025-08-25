import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/models/User.model";
import jwt from "jsonwebtoken";
import { connect } from "@/db/config";
import { apiLimiter, res } from "@/middleware/rateLiming";

export async function GET(req: Request) {
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

  const token = (await cookies()).get("session")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await User.findById(decoded.id).select(
      "_id full_name email avatar"
    );

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
