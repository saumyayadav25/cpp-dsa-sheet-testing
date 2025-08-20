import { NextResponse } from "next/server";
import { connect } from 'db/config';
import quizSchema from "@/models/quizSchema";

export async function GET(_req: Request, context: any) {
  try {
      const { userId } = await context.params;
      console.log(`[INFO] Connecting to database for userId: ${userId}`);
      await connect();

        console.log(`[INFO] Fetching recent quiz results for userId: ${userId}`);
        const recent = await quizSchema.find({ userId: userId })
            .sort({ timestamp: -1 })
            .limit(5);

        console.log(`[INFO] Successfully fetched ${recent.length} results for userId: ${userId}`);
        return NextResponse.json(recent, { status: 200 });
    } catch (error) {
        console.error(`[ERROR] Failed to fetch recent results`, error);
        return NextResponse.json({ error: "Failed to fetch recent results" }, { status: 500 });
    }
}
