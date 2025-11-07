import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getDailyHoroscope(starsign, mood) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    Act as an intuitive astrologer.
    Generate a short daily horoscope message for someone with the zodiac sign ${starsign},
    who is currently feeling ${mood}.
    Make it sound mystical but friendly (2–3 sentences).
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
