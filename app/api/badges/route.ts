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

    if (progress?.topicsCompleted?.length > 0) {
      topicsToAdd = [...progress.topicsCompleted];
    }

    // If badgeName was passed directly, add it to topicsToAdd
    if (badgeName) {
      topicsToAdd.push(badgeName);
    }

    // Only update if we actually have badges to add
    if (topicsToAdd.length > 0) {
      const updated = await Badge.findOneAndUpdate(
        { userId },
        { $addToSet: { badges: { $each: topicsToAdd } } }, // prevents duplicates
        { upsert: true, new: true }
      );

      return NextResponse.json({
        message: "Badges awarded successfully",
        badges: updated.badges,
      });
    } else {
      return NextResponse.json({
        message: "No topics found to award badges for",
        badges: [],
      });
    }
  } catch (error) {
    console.error("Error awarding badge:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
