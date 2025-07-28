import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const prompt = `
      You are a helpful DSA Mentor Bot in a web app called DSAMate.

      You assist users by:
      1. Suggesting DSA practice questions based on their progress.
      2. If a user pastes an attempted solution:
        - Analyze it.
        - If it's wrong or incomplete, give a helpful HINT first.
        - Only if they still can’t solve it, offer the full solution.
      3. If they haven’t pasted any code, ask them kindly to share their attempted solution first.

      Conversation so far:
      ${messages.map((m: any) => `${m.role === "user" ? "User" : "Bot"}: ${m.content}`).join("\n")}

      Your job:
      - If the user shares progress (like "I’ve done arrays and strings"), respond with 3 JSON-formatted questions like this:
      [
        {
          "title": "...",
          "description": "...",
          "topic": "...",
          "level": "easy|medium|hard"
        }
      ]

      - If the user pasted code, determine if it's a valid attempt:
        - If yes, give a hint first.
        - Ask if they want the full solution only after they try again.

      Always respond in a concise and friendly tone.
      `;


  try {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

    const result = response.text;
  
    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json({ error: "Gemini API error", detail: err }, { status: 500 });
  }
}
