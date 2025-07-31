import { NextResponse } from "next/server";
import {connect} from "@/db/config";
import { Progress } from "@/models/Progress.model";
import { Badge } from "@/models/Badge.model";
import { awardBadges } from "@/lib/awardBadges";

export async function POST(req: Request) {
  try {
    await connect();
    const { userId, questionDifficulty, topicCompleted } = await req.json();

    if (!userId)
      return NextResponse.json({ message: "UserId required" }, { status: 400 });

    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = await Progress.create({ userId });
    }

    // Update streak
    const today = new Date();
    if (progress.lastVisited) {
      const diff = Math.floor(
        (today.getTime() - progress.lastVisited.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff === 1) progress.streakCount += 1;
      else if (diff > 1) progress.streakCount = 1;
    } else {
      progress.streakCount = 1;
    }
    progress.lastVisited = today;

    // Increment counters
    progress.totalSolved += 1;
    if (questionDifficulty === "hard") progress.hardSolved += 1;
    if (topicCompleted && !progress.topicsCompleted.includes(topicCompleted)) {
      progress.topicsCompleted.push(topicCompleted);
    }
    await progress.save();

    // Get existing badges
    const badgeDoc = await Badge.findOne({ userId });
    const currentBadges = badgeDoc?.badges || [];

    // Auto Award
    await awardBadges(userId, { ...progress.toObject(), badges: currentBadges });

    const updatedBadges = await Badge.findOne({ userId });

    return NextResponse.json({
      message: "Progress updated",
      progress,
      badges: updatedBadges?.badges || []
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
