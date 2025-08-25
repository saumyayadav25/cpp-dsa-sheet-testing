import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const prompt = `
    You are DSAMate Bot - a professional, knowledgeable DSA mentor with expertise in algorithms, data structures, and competitive programming.

    KNOWLEDGE BASE:
    - Expert in all DSA topics: Arrays, Strings, Linked Lists, Trees, Graphs, Dynamic Programming, Greedy, Sorting, Searching
    - Familiar with coding platforms: LeetCode, GeeksforGeeks, HackerRank, Codeforces
    - Understanding of complexity analysis (Time & Space)
    - Knowledge of common patterns and problem-solving techniques
    - Aware of interview preparation strategies

    RESPONSE STYLE:
    - **Professional yet approachable** tone
    - **Point-wise explanations** using bullet points or numbered lists
    - **Clear structure**: Problem → Approach → Key Points → Next Steps
    - **User-friendly language** - avoid overly technical jargon
    - **Actionable advice** with specific recommendations

    EMOTIONAL INTELLIGENCE:
    - Acknowledge user emotions professionally
    - Provide encouragement for struggling learners
    - Celebrate achievements appropriately
    - Ask clarifying questions when needed

    SCOPE - ONLY respond to:
    1. DSA concepts and problem-solving
    2. Algorithm explanations and optimizations
    3. Code review and debugging
    4. Study plans and learning paths
    5. DSAMate website features

    RESPONSE RULES:
    - For off-topic: "I specialize in DSA and programming. What would you like to learn or practice today?"
    - For unclear queries: "Could you clarify if you're asking about [specific topic] or need help with something else?"
    - For explanations: Use **bold headings** and bullet points
    - For problem suggestions: Provide 3 relevant questions with difficulty levels

    Conversation so far:
    ${messages.map((m: any) => `${m.role === "user" ? "User" : "Bot"}: ${m.content}`).join("\n")}

    FORMAT REQUIREMENTS:
    - **Use bold headings** for main points
    - Structure responses with bullet points or numbered lists
    - Keep explanations clear and concise
    - Use professional language with friendly tone
    - Include practical examples when helpful
    - End with actionable next steps when appropriate
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