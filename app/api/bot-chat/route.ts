import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);

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
    - If the user shares progress (like "I’ve done arrays and strings"), respond with **exactly 3 questions**.
    - Preferred format: Numbered markdown list (\`1.\`, \`2.\`, \`3.\`) with:
      - **Bold title**
      - Description on the next line
      - Topic and Level in italics at the end
    - If you choose to send JSON, send it as a **raw array without any code fences**.
    - Never wrap responses in triple backticks or language identifiers.
    - Keep the tone concise and friendly.
  `;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    let text = result.response.text().trim();

    // 🔹 Remove accidental ```json or ``` code fences
    text = text.replace(/```json\s*([\s\S]*?)```/gi, "$1").trim();
    text = text.replace(/```([\s\S]*?)```/g, "$1").trim();

    let formatted;

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        formatted = parsed
          .map(
            (q: any, i: number) =>
              `${i + 1}. **${q.title}**\n${q.description}\n*Topic:* ${q.topic}, *Level:* ${q.level}`
          )
          .join("\n\n");
      } else {
        formatted = text;
      }
    } catch {
      formatted = text; // fallback if not valid JSON
    }

    return NextResponse.json({ result: formatted });
  } catch (err) {
    return NextResponse.json(
      { error: "Gemini API error", detail: err },
      { status: 500 }
    );
  }
}
