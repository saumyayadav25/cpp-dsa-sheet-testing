import { NextResponse } from "next/server";
import { connect } from 'db/config';
import quizSchema from "@/models/quizSchema";

export async function POST(req: Request) {
    try {
        await connect();
        const body = await req.json();

        const { userId, quizId, score, totalQuestions, correctAnswers, quizType } = body;

        console.log("Received quiz result payload:", body);

        const result = await quizSchema.create({
            userId,
            quizId,
            score,
            totalQuestions,
            correctAnswers,
            quizType,
        });

        console.log("Quiz result saved successfully:", result);

        return NextResponse.json({ message: "Result saved", result }, { status: 201 });
    } catch (error) {
        console.error("Error saving quiz result:", error);

        // Optionally log more details if available
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }

        return NextResponse.json({ error: "Failed to save result" }, { status: 500 });
    }
}
