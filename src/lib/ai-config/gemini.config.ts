import { GoogleGenerativeAI, Tool } from "@google/generative-ai";
import axios from "axios";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


export async function chatWithGeminiAI(userMessage: string) {
  const model = genAI.getGenerativeModel({model: "gemini-2.5-flash-lite"});

  const result = await model.generateContent(userMessage);
  const response = result.response;
  
  return response.text();
}
