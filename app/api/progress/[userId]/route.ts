import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import { Progress } from "@/models/Progress.model";
import { Badge } from "@/models/Badge.model";

export async function GET(
  _req: Request,
  context: any
) {
  try {
    await connect();
    const { userId } = context.params;

    const progress = await Progress.findOne({ userId }).lean() as any;
    const badgeDocRaw = await Badge.findOne({ userId }).lean();
    const badgeDoc = Array.isArray(badgeDocRaw) ? badgeDocRaw[0] : badgeDocRaw;

    // If progress is an array, get the first element
    const progressDoc = Array.isArray(progress) ? progress[0] : progress;

    if (!progressDoc) {
      return NextResponse.json({
        progress: {
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          totalSolved: 0,
          streakCount: 0,
          topicsProgress: [],
          lastVisited: null
        },
        badges: badgeDoc && 'badges' in badgeDoc ? badgeDoc.badges : []
      });
    }

    return NextResponse.json({
      progress: {
        easySolved: progressDoc.easySolved,
        mediumSolved: progressDoc.mediumSolved,
        hardSolved: progressDoc.hardSolved,
        totalSolved: progressDoc.totalSolved,
        streakCount: progressDoc.streakCount,
        topicsProgress: progressDoc.topicsProgress || [],
        lastVisited: progressDoc.lastVisited
      },
      badges: badgeDoc?.badges || []
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}


