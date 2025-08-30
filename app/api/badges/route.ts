import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { Badge } from "@/models/Badge.model";
import { Progress } from "@/models/Progress.model";

export async function POST(req: Request) {
  try {
    await connect();

    const { userId, badgeName } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    // Get user's completed topics from Progress collection
    const progress = await Progress.findOne({ userId });
    let topicsToAdd: string[] = [];

    if (Array.isArray(progress?.topicsCompleted) && progress.topicsCompleted.length > 0) {
      topicsToAdd = [...progress.topicsCompleted];
    }

    // If badgeName was passed directly, add it
    if (badgeName) {
      topicsToAdd.push(badgeName);
    }

    // --- Fetch current badges to avoid duplicates ---
    interface BadgeObject {
      name: string;
      claimedAt: Date;
    }

    interface BadgeDoc {
      userId: string;
      badges: BadgeObject[];
    }

    const badgeDoc: BadgeDoc | null = await Badge.findOne({ userId });
    const existingBadges: string[] = badgeDoc?.badges?.map((b: BadgeObject) => b.name) || [];

    // Only update if we actually have badges to add
    if (topicsToAdd.length > 0) {
      const badgesToAddObjects = topicsToAdd
        .filter(name => !existingBadges.includes(name))
        .map(name => ({ name, claimedAt: new Date() }));

      if (badgesToAddObjects.length > 0) {
        const updated = await Badge.findOneAndUpdate(
          { userId },
          { $push: { badges: { $each: badgesToAddObjects } } },
          { upsert: true, new: true }
        );

        return NextResponse.json({
          message: "Badges awarded successfully",
          badges: updated.badges,
        });
      }
    }

    return NextResponse.json({
      message: "No new badges to award",
      badges: existingBadges.length > 0 ? badgeDoc?.badges : [],
    });
  } catch (error) {
    console.error("Error awarding badge:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
