import express from "express";
import { getGeminiResponse, setLanguage } from "../geminiWrapper.js";

const router = express.Router();

// POST /ai - expects { message, history, language }
router.post("/", async (req, res) => {
  const { message, history = [], language } = req.body;
  if (language) setLanguage(language);
  if (!message) return res.status(400).json({ error: "Message is required" });
  try {
    const response = await getGeminiResponse(message, history);
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: "AI response failed" });
  }
});

export default router;
