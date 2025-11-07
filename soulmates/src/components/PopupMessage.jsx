import { useEffect, useState } from "react";
import ScratchCard from "react-scratchcard-v2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../assets/popup.css";
import { getMoods } from "../api/route";

const PopupMessage = ({ starsign = "Aries", user}) => {
  const [message, setMessage] = useState("✨ The stars are aligning... ✨");
  const [visible, setVisible] = useState(true);
  const [mood, setMood] = useState("");

  const settings = {
    width: 300,
    height: 200,
    image: "/card.png",
    finishPercent: 70,
  };

  useEffect(() => {
    async function fetchMessage() {
      try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
          You are a friendly AI astrologer.
          Generate a short (2–3 sentence) horoscope for a ${starsign}
          who is feeling ${mood}. Make it mystical, positive and personal.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        setMessage(text || "🌙 The stars are quiet tonight...");
      } catch (error) {
        console.error("AI generation failed:", error);
        setMessage("The stars are a bit shy today... 🌙");
      }
    }

    fetchMessage();
  }, [starsign, mood]);

  useEffect(() => {
  const fetchMood = async () => {
    try {
      const latestMood = await getMoods(user);
      setMood(latestMood?.type);
      console.log("User's latest mood:", latestMood?.type);
    } catch (err) {
      console.error("Error fetching mood:", err);
    }
  };
  fetchMood();
}, []);

  if (!visible) return null; // ha bezártuk, ne jelenjen meg

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <p>You are now {mood}</p>
        <div className="popup-close" onClick={() => setVisible(false)}>✕</div>
        <ScratchCard {...settings}>
          <div className="text-center p-3">
            <p>{message}</p>
          </div>
        </ScratchCard>
      </div>
    </div>
  );
};

export default PopupMessage;

