
import { GoogleGenAI } from "@google/genai";

const getAIInstance = () => {
  // Always use direct access to process.env.API_KEY as required by the SDK guidelines.
  // Assume the variable is pre-configured and accessible.
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    // The .text property is used directly as it is not a method
    return response.text || "My love, I couldn't find the words, but my heart beats for you every day. Happy Birthday!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Happy Birthday to the love of my life! You make every day brighter just by being in it.";
  }
};
