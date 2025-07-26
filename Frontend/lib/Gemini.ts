import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const prompt = SUMMARY_SYSTEM_PROMPT;

export async function generateSummary(pdfText: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
            role: 'user',
            parts: [
                {
                    text: prompt
                },
                {
                  text: `Transform this_document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
                }
            ],
        },
      ],
    });

    const result = response.text;

    if(result === ""){
        throw new Error("No response from AI");
    }
    console.log(result);

    return result;

  } catch (error: any) {
    console.log("Failed to generarte response", error);
  }
}
