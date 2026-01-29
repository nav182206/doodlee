
import { GoogleGenAI } from "@google/genai";

const getAIInstance = () => {
  // Safe check for process.env to prevent ReferenceErrors in browser environments
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const generateLoveLetter = async (prompt: string): Promise<string> => {
  try {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a deeply romantic, poetic, and sincere writer. Write a short, emotional birthday letter (about 100-150 words) for a girlfriend. Use this context: ${prompt}. Make it feel personal, intimate, and warm.`,
      config: {
        temperature: 0.9,
      },
    });
    return response.text || "My love, I couldn't find the words, but my heart beats for you every day. Happy Birthday!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Happy Birthday to the love of my life! You make every day brighter just by being in it.";
  }
};
