// app/api/generate-quiz/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// Make sure your GOOGLE_API_KEY is in your .env.local file
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Generate 10 unique, beginner-level quiz questions about data structures and algorithms.
      The topics should be similar to binary search, stacks, queues, sorting algorithms, and basic graph traversal.
      Respond ONLY with a valid JSON array. Do not include markdown formatting like \`\`\`json or any other text outside the JSON array.
      Each object in the array must have this exact structure:
      {
        "question": "The question text.",
        "options": ["An array of 4 string options."],
        "answer": "A string that exactly matches one of the 4 options."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Sometimes the model might still wrap the output in markdown, so we clean it.
    const cleanedText = text.replace(/^```json\s*|```\s*$/g, '').trim();

    const questions = JSON.parse(cleanedText);
    return NextResponse.json(questions);

  } catch (error) {
    console.error("Error generating quiz questions:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz questions." },
      { status: 500 }
    );
  }
}