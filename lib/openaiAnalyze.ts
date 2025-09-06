import axios from 'axios';

export async function analyzeWithOpenAI(code: string, language: string): Promise<{ time: string; space: string; explanation?: string }> {
  // This function assumes you have an API route set up to call OpenAI securely
  // Replace '/api/openai-analyze' with your actual API endpoint
  const response = await axios.post('/api/openai-analyze', { code, language });
  return response.data;
}
