
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const getGeminiResponse = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    // We convert our local history format to Gemini's expected format if needed, 
    // but here we'll just send the current message for simplicity in this version,
    // or you could use chat.sendMessageStream for a better experience.
    
    const response = await chat.sendMessage({
      message: userMessage
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const getGeminiStreamingResponse = async function* (userMessage: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessageStream({ message: userMessage });
    for await (const chunk of result) {
      yield chunk.text;
    }
  } catch (error) {
    console.error("Gemini Streaming Error:", error);
    throw error;
  }
};
