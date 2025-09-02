import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { code, language } = req.body;
  if (!code || !language) {
    return res.status(400).json({ error: 'Missing code or language' });
  }
  try {
    const prompt = `Analyze the following ${language} code and estimate its time and space complexity. Give a short explanation.\n\nCode:\n${code}`;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Try to extract time and space complexity from the response
    const timeMatch = text.match(/Time Complexity\s*[:\-]?\s*(O\([^)]+\))/i);
    const spaceMatch = text.match(/Space Complexity\s*[:\-]?\s*(O\([^)]+\))/i);
    res.status(200).json({
      time: timeMatch ? timeMatch[1] : 'Unknown',
      space: spaceMatch ? spaceMatch[1] : 'Unknown',
      explanation: text,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze code', details: error });
  }
}
