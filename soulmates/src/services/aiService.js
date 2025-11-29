import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing Gemini API key in env (VITE_GEMINI_API_KEY)");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function getDailyHoroscope(starsign, mood) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    Act as an intuitive astrologer.
    Generate a short daily horoscope for a ${starsign}
    who feels ${mood}. Write 2–3 sentences.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
