import { NextResponse } from "next/server";
import { connect } from 'db/config';
import quizSchema from "@/models/quizSchema";

export async function GET(_req: Request, context: any) {
  try {

    const { userId } = await context.params;
    console.log(`[INFO] Connecting to database...`); 
    await connect(); 
    console.log(`[INFO] Fetching quiz results for userId: ${userId}`);
    const results = await quizSchema.find({ userId: userId }).sort({ timestamp: -1 });
    console.log(`[INFO] Fetched ${results.length} results for userId: ${userId}`);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error(`[ERROR] Failed to fetch results`, error);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
    }
}
