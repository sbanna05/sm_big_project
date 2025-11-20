import { useEffect, useState } from "react";
import ScratchCard from "react-scratchcard-v2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../assets/popup.css";
import { getMoods } from "../api/route";

const PopupMessage = ({ starsign = "Taurus", user }) => {
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
    const fetchMood = async () => {
      try {
        const latestMood = await getMoods(user);
        // Biztosítjuk, hogy van alapértelmezett hangulat, ha a lekérdezés üres
        setMood(latestMood?.type || "nyugodt");
        console.log("User's latest mood:", latestMood?.type);
      } catch (err) {
        console.error("Error fetching mood:", err);
        setMood("calm"); // Hiba esetén is beállítunk egy alap hangulatot
      }
    };
    fetchMood();
  }, [user]);

  // Gemini hívás
  useEffect(() => {
    // Csak akkor fut le, ha a hangulat be van töltve (vagy alapértelmezett be van állítva)
    if (!mood) return;

    async function fetchMessage() {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        // **FŐ ELLENŐRZÉS: Hiányzó API kulcs**
        if (!apiKey) {
          console.error(
            "HIBA: A VITE_GEMINI_API_KEY hiányzik a környezeti változókból."
          );
          setMessage(
            "A csillagok a kulcsukat keresik. Ellenőrizd az API kulcsot! 🔑"
          );
          return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
          You are a friendly AI astrologer.
          Generate a short (2–3 sentence) horoscope for a ${starsign}
          who is feeling ${mood}. Make it mystical, positive and personal.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text;
        setMessage(text || "🌙 The stars are quiet tonight...");
      } catch (error) {
        console.error("AI generation failed:", error);
        setMessage("The stars are a bit shy today... 🌙");
      }
    }

    setMessage("✨ The stars are aligning... ✨"); // Üzenet frissítése betöltésre
    fetchMessage();
  }, [starsign, mood]);

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
