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
        { message: "userId is required" },
        { status: 400 }
      );
    }

    // Ensure that Badge schema includes 'updatedAt' as a field
    const badgeDoc = await Badge.findOne({ userId }).lean<{ badges: any[]; updatedAt?: Date }>();

    if (!badgeDoc) {
      return NextResponse.json(
        { message: "No badges found for this user", badges: [], updatedAt: null },
        { status: 404 }
      );
    }

    // Sort badges by claimedAt descending (most recent first)
    const sortedBadges = badgeDoc.badges.sort(
      (a: any, b: any) => new Date(b.claimedAt).getTime() - new Date(a.claimedAt).getTime()
    );
    return NextResponse.json({
      badges: sortedBadges,
      updatedAt: badgeDoc.updatedAt ?? null,
    });
  } catch (error) {
    console.error("Error fetching badges:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
