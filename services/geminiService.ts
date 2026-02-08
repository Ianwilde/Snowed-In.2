
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateCaptionSuggestion = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, cozy, "snowed-in" themed social media caption for a photo described as: "${description}". Use 1 emoji max. Keep it friendly neighbor-to-neighbor style.`,
    });
    return response.text?.trim() || "Chilling in the snow! ❄️";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Beautiful winter day! ❄️";
  }
};

export const getNeighborResponse = async (userMessage: string, neighborName: string, neighborNumber: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are ${neighborName}, a friendly resident in apartment ${neighborNumber} of the "Snowed In" complex. Respond to this message from your neighbor: "${userMessage}". Keep it short, conversational, and neighborly. Maybe mention the snow or building life.`,
    });
    return response.text?.trim() || "Hey neighbor! Stay warm!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hey! I'm a bit busy digging my way out of the snow, talk soon!";
  }
};
