import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { Progress } from "@/models/Progress.model";
import { Badge } from "@/models/Badge.model";

export async function GET(_req: Request, context: any) {
  try {
    await connect();
    const { userId } = await context.params;

    const progress = await Progress.findOne({ userId }).lean() as any;
    const badgeDocRaw = await Badge.findOne({ userId }).lean();
    const badgeDoc = Array.isArray(badgeDocRaw) ? badgeDocRaw[0] : badgeDocRaw;

    const progressDoc = Array.isArray(progress) ? progress[0] : progress;

    if (!progressDoc) {
      return NextResponse.json({
        progress: {
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          totalSolved: 0,
          streakCount: 0,
          markedForRevision: 0,
          topicsCompleted: [],
          topicsProgress: [],
          lastVisited: null,
          lastDayId: null
        },
        badges: badgeDoc && 'badges' in badgeDoc ? badgeDoc.badges : []
      });
    }

    // 🔹 Compute topicsCompleted dynamically
    const topicsCompleted = (progressDoc.topicsProgress || [])
      .filter((t: any) => t.solvedCount >= t.totalQuestions && t.totalQuestions > 0)
      .map((t: any) => t.topicName);

    // 🔹 If not stored yet or outdated, update in DB
    if (
      !progressDoc.topicsCompleted ||
      progressDoc.topicsCompleted.length !== topicsCompleted.length
    ) {
      await Progress.updateOne(
        { userId },
        { $set: { topicsCompleted } }
      );
    }

    return NextResponse.json({
      progress: {
        easySolved: progressDoc.easySolved,
        mediumSolved: progressDoc.mediumSolved,
        hardSolved: progressDoc.hardSolved,
        totalSolved: progressDoc.totalSolved,
        streakCount: progressDoc.streakCount,
        lastDayId: progressDoc.lastDayId,
        markedForRevision: progressDoc.markedForRevision,
        topicsCompleted, // ✅ send to frontend
        topicsProgress: progress.topicsProgress.map((t: { topicName: any; solvedCount: any; totalQuestions: any; }) => ({
          topicName: t.topicName,
          solvedCount: t.solvedCount,
          totalQuestions: t.totalQuestions // Make sure this field exists
        })),
        lastVisited: progressDoc.lastVisited
      },
      badges: badgeDoc?.badges || []
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}