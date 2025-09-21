import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.resolve();
const infoFilePath = path.join(__dirname, "src", "info.txt");
const systemInstructions = fs.existsSync(infoFilePath) ? fs.readFileSync(infoFilePath, "utf-8") : "You are an AI assistant.";

let lang = "english";
let language = `respond in ${lang} now`;

export function setLanguage(newLang) {
  lang = newLang;
  language = `respond in ${lang} now`;
}

export function getLanguage() {
  return lang;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiResponse(userMessage, conversationHistory = []) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const historyContent = conversationHistory.flatMap(entry => [
    { role: "user", parts: [{ text: entry.message }] },
    { role: "model", parts: [{ text: entry.response }] }
  ]);

  const contents = [
    { role: "user", parts: [{ text: systemInstructions + "  " + language }] },
    ...historyContent,
    { role: "user", parts: [{ text: userMessage }] }
  ];

  try {
    const result = await model.generateContent({ contents });
    const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || 
                 "No response from model.";
    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I couldn't get a response right now.";
  }
}
