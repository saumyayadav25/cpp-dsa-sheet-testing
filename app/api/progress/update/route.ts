import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { Progress } from "@/models/Progress.model";
import { Badge } from "@/models/Badge.model";
import { awardBadges } from "@/lib/awardBadges";
interface TopicProgress {
  topicName: string;
  solvedCount: number;
  totalQuestions: number;
}

interface ProgressType {
  userId: string;
  lastVisited?: Date;
  streakCount: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  topicsProgress: TopicProgress[];
  save: () => Promise<void>;
  toObject: () => object;
}
export async function POST(req: Request) {
  try {
    await connect();
    const { userId, questionDifficulty, topicName, topicTotalQuestions } = await req.json();

    if (!userId)
      return NextResponse.json({ message: "UserId required" }, { status: 400 });

    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = await Progress.create({ userId });
    }

    // --- Streak Update ---
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

    // --- Difficulty Counters ---
    if (questionDifficulty === "easy") progress.easySolved += 1;
    if (questionDifficulty === "medium") progress.mediumSolved += 1;
    if (questionDifficulty === "hard") progress.hardSolved += 1;

    // Auto-calculate totalSolved
    progress.totalSolved =
      Number(progress.easySolved ?? 0) +
      Number(progress.mediumSolved ?? 0) +
      Number(progress.hardSolved ?? 0);


    // --- Topic-wise Progress ---
    if (topicName && topicTotalQuestions) {
      const topicIndex: number = (progress as ProgressType).topicsProgress.findIndex(
        (t: TopicProgress) => t.topicName === topicName
      );

      if (topicIndex > -1) {
        // Update existing topic
        if (progress.topicsProgress[topicIndex].solvedCount < topicTotalQuestions) {
          progress.topicsProgress[topicIndex].solvedCount += 1;
        }
      } else {
        // Add new topic
        progress.topicsProgress.push({
          topicName,
          solvedCount: 1,
          totalQuestions: topicTotalQuestions
        });
      }
    }

    await progress.save();

    // --- Badges ---
    const badgeDoc = await Badge.findOne({ userId });
    const currentBadges = badgeDoc?.badges || [];

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
