import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).set("session", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return NextResponse.json({ success: true, message: " User Logged out" }, {status: 200});
}
