// app/api/generate-feedback/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

export async function POST(req: Request) {
  try {
    const { question, userAnswer, correctAnswer } = await req.json();

    if (!question || !userAnswer || !correctAnswer) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const isCorrect = userAnswer === correctAnswer;
    const prompt = isCorrect
      ? `The user correctly answered the quiz question: "${question}" with the answer "${correctAnswer}". Briefly explain why this answer is correct in one or two sentences. Start your response with "Correct!"`
      : `For the quiz question: "${question}", the user incorrectly answered "${userAnswer}". The correct answer is "${correctAnswer}". Briefly explain why "${correctAnswer}" is the right choice in one or two sentences. Start your response with "Not quite."`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const explanation = response.text();

    return NextResponse.json({ explanation });

  } catch (error) {
    console.error("Error generating feedback:", error);
    return NextResponse.json({ error: "Failed to generate feedback." }, { status: 500 });
  }
}