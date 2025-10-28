import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { Progress } from "@/models/Progress.model";
import { Badge } from "@/models/Badge.model";
import { awardBadges } from "@/lib/awardBadges";
import { SolvedQuestion } from "@/models/SolvedQuestion.model";

interface TopicProgress {
  topicName: string;
  solvedCount: number;
  totalQuestions?: number;
}

export async function POST(req: Request) {
  try {
    await connect();

    const {
      userId,
      questionDifficulty,
      questionId,
      isSolved,
      topicName,
      topicCompleted,
      language,
      solutionCode,
      clientDayId,
    } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "UserId required" }, { status: 400 });
    }

    let progress = await Progress.findOne({ userId });
    if (!progress) progress = await Progress.create({ userId });

    const now = new Date();
    const serverDayId = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const dayId =
      typeof clientDayId === "string" && /\d{4}-\d{2}-\d{2}/.test(clientDayId)
        ? clientDayId
        : serverDayId;
    if (progress.lastDayId) {
      const [y, m, d] = progress.lastDayId.split("-").map(Number);
      const last = new Date(y, (m || 1) - 1, d || 1);
      const [cy, cm, cd] = dayId.split("-").map(Number);
      const cur = new Date(cy, (cm || 1) - 1, cd || 1);
      const diffDays = Math.floor(
        (cur.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 0) {
      } else if (diffDays === 1) {
        progress.streakCount = Math.max(1, (progress.streakCount || 0) + 1);
      } else if (diffDays > 1) {
        progress.streakCount = 1;
      }
    } else {
      progress.streakCount = Math.max(1, progress.streakCount || 1);
    }
    progress.lastDayId = dayId;
    progress.lastVisited = now;

    if (questionDifficulty) {
      if (isSolved) {
        if (questionDifficulty === "easy") progress.easySolved += 1;
        if (questionDifficulty === "medium") progress.mediumSolved += 1;
        if (questionDifficulty === "hard") progress.hardSolved += 1;
      }
    }

    progress.totalSolved =
      Number(progress.easySolved ?? 0) +
      Number(progress.mediumSolved ?? 0) +
      Number(progress.hardSolved ?? 0);

    if (topicName) {
      const topicIndex = progress.topicsProgress.findIndex(
        (t: TopicProgress) => t.topicName === topicName
      );

      if (topicIndex > -1) {
        if (isSolved) {
          progress.topicsProgress[topicIndex].solvedCount += 1;
        }
      } else if (isSolved) {
        progress.topicsProgress.push({
          topicName,
          solvedCount: 1,
          totalQuestions: 5,
          markedForRevision: 0,
        });
      }
    }

    if (!progress.topicsCompleted) progress.topicsCompleted = [];

    if (topicCompleted && !progress.topicsCompleted.includes(topicCompleted)) {
      progress.topicsCompleted.push(topicCompleted);
    }

    progress.topicsProgress.forEach((topic) => {
      const total = topic.totalQuestions || 5;
      if (
        topic.solvedCount >= total &&
        !progress.topicsCompleted.includes(topic.topicName)
      ) {
        progress.topicsCompleted.push(topic.topicName);
      }
    });

    await progress.save();

    if (isSolved && language && solutionCode && questionId) {
      await SolvedQuestion.create({
        userId,
        questionId,
        language,
        solutionCode,
      });
    }

    const badgeDoc = await Badge.findOne({ userId });
    const currentBadges = badgeDoc?.badges || [];

    await awardBadges(userId, {
      ...progress.toObject(),
      badges: currentBadges,
    });
    const updatedBadges = await Badge.findOne({ userId });

    return NextResponse.json({
      message: "Progress updated",
      progress,
      badges: updatedBadges?.badges || [],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
