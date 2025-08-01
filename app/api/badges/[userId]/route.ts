import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { Badge } from "@/models/Badge.model";

type Context = {
  params: Promise<{ userId: string }>;
};

export async function GET(_req: Request, context: Context) {
  try {
    await connect();

    const { userId } = await context.params;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const badgeDoc = await Badge.findOne({ userId });

    if (!badgeDoc) {
      return NextResponse.json(
        { message: "No badges found for this user", badges: [] },
        { status: 404 }
      );
    }

    return NextResponse.json({ badges: badgeDoc.badges });
  } catch (error) {
    console.error("Error fetching badges:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}