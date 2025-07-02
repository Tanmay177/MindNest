import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { messages } = req.body;
  if (!messages) {
    return res.status(400).json({ error: "Missing messages" });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 