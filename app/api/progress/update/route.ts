import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { Progress } from "@/models/Progress.model";
import { Badge } from "@/models/Badge.model";
import { awardBadges } from "@/lib/awardBadges";
import { SolvedQuestion } from "@/models/SolvedQuestion.model"; // Import the new model

interface TopicProgress {
  topicName: string;
  solvedCount: number;
  totalQuestions?: number;
}

export async function POST(req: Request) {
  try {
    await connect();
    //Add language and solutionCode to destructuring
    const {
      userId,
      questionDifficulty,
      questionId,
      isSolved,
      topicName,
      topicCompleted,
      language,
      solutionCode,
    } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "UserId required" }, { status: 400 });
    }

    // --- Fetch or create progress ---
    let progress = await Progress.findOne({ userId });
    if (!progress) progress = await Progress.create({ userId });

    // --- Streak Update ---
    const today = new Date();
    if (progress.lastVisited) {
      const diff = Math.floor(
        (today.getTime() - progress.lastVisited.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (diff === 1) progress.streakCount += 1;
      else if (diff > 1) progress.streakCount = 1;
    } else progress.streakCount = 1;
    progress.lastVisited = today;

    // --- Difficulty Counters ---
    if (questionDifficulty) {
      // Note: This logic for tracking previously solved questions might need refinement
      // For now, assuming it works as intended for aggregate counts.
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

    // --- Topic-wise Progress ---
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
          totalQuestions: 5, // This could be made dynamic
          markedForRevision: 0,
        });
      }
    }

    // --- Topic Completion ---
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

    // --- NEW: Save the specific code solution ---
    if (isSolved && language && solutionCode && questionId) {
      await SolvedQuestion.create({
        userId,
        questionId,
        language,
        solutionCode,
      });
    }

    // --- Badges ---
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
