import { NextResponse } from "next/server";
import { connect } from 'db/config';
import quizSchema from "@/models/quizSchema";

export async function GET(_req: Request, context: any) {
    try {
        await connect();
        const { userId } = context.params;
        console.log(`[INFO] Fetching quiz results for userId: ${userId}`);

        const results = await quizSchema.find({ userId: userId });

        if (!results.length) {
            console.warn(`[WARN] No quiz results found for userId: ${userId}`);
            return NextResponse.json({ avgScore: 0, totalQuizzes: 0 });
        }

        const totalQuizzes = results.length;
        const avgScore =
            results.reduce((sum, r) => sum + r.score, 0) / totalQuizzes;

        console.log(`[INFO] Found ${totalQuizzes} quizzes for userId: ${userId}. Avg score: ${avgScore}`);

        return NextResponse.json({ avgScore, totalQuizzes, history: results }, { status: 200 });
    } catch (error) {
        console.error(`[ERROR] Failed to fetch stats for userId: ${context?.params?.userId}`, error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
