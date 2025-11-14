import React, { useState, useEffect } from "react";
import "../assets/friends.css";
import img1 from "../assets/photos/219964.png";
import img2 from "../assets/photos/219969.png";


export default function Friends() {
  const [mood, setMood] = useState("Happy");
  const [zodiac, setZodiac] = useState("Gemini");
  const [results, setResults] = useState([]);

  const possibleFriends = [
    { name: "Luna Hart", zodiac: "Leo", mood: "Excited", img: "img2" },
    { name: "Mira Selene", zodiac: "Pisces", mood: "Bored", img: "" },
    { name: "Nova Arden", zodiac: "Gemini", mood: "Angry", img: "" },
    { name: "Cassian Vale", zodiac: "Scorpio", mood: "Sad", img: "" },
    { name: "Eira Solis", zodiac: "Cancer", mood: "Happy", img: "" }
  ];

  useEffect(() => {
    const filtered = possibleFriends.filter(
      (f) => f.mood === mood || f.zodiac === zodiac
    );
    setResults(filtered);
  }, [mood, zodiac]);

  return (
    <div className="friends-page">
      <h1 className="friends-title">✨ Cosmic Friend Finder ✨</h1>
      <p className="friends-sub">Find connections aligned with your mood and zodiac.</p>

      <div className="filters">
        <div>
          <label>Mood</label>
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            <option>Angry</option>
            <option>Sad</option>
            <option>Bored</option>
            <option>Happy</option>
            <option>Excited</option>
          </select>
        </div>

        <div>
          <label>Zodiac</label>
          <select value={zodiac} onChange={(e) => setZodiac(e.target.value)}>
            <option>Aries</option>
            <option>Taurus</option>
            <option>Gemini</option>
            <option>Cancer</option>
            <option>Leo</option>
            <option>Virgo</option>
            <option>Libra</option>
            <option>Scorpio</option>
            <option>Sagittarius</option>
            <option>Capricorn</option>
            <option>Aquarius</option>
            <option>Pisces</option>
          </select>
        </div>
      </div>

      <div className="results-grid">
        {results.map((f, index) => (
          <div key={index} className="friend-card">
            <img src={f.img} className="friend-img" />
            <h2>{f.name}</h2>
            <p>⭐ {f.zodiac}</p>
            <p>💫 Mood: {f.mood}</p>
            <button className="add-btn">Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
}
