import React, { useState, useEffect } from "react";
import { getUsers } from "../api/route.js";
import { UserAuth } from "../context/AuthContext";
import "../assets/friends.css";

// Random avatarok
import img1 from "../../public/photos/proff1.png";
import img2 from "../../public/photos/219964.png";
import img3 from "../../public/photos/219969.png";
import img4 from "../../public/photos/219986.png";
import img5 from "../../public/photos/219987.png";
import img6 from "../../public/photos/6997662.png";

const avatarList = [img1, img2, img3, img4, img5, img6];

export default function Friends() {
  const { user: authUser } = UserAuth();
  const [mood, setMood] = useState("Happy");
  const [zodiac, setZodiac] = useState("Gemini");
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);

  // ------ USERS BETÖLTÉSE --------
  useEffect(() => {
    async function loadUsers() {
      const data = await getUsers();

      // saját user kiszedése
      const filteredUsers = data.filter((u) => u.id !== authUser.id);

      // random avatar + mood + zodiac hozzáadása
      const enriched = filteredUsers.map((u) => ({
        ...u,
        zodiac: u.starsign || "Unknown",
        mood: "Happy",
        img: avatarList[Math.floor(Math.random() * avatarList.length)]
      }));

      setUsers(enriched);
    }

    if (authUser) loadUsers();
  }, [authUser]);

  // ------ SZŰRÉS MOOD + ZODIAC ALAPJÁN --------
  useEffect(() => {
    const filtered = users.filter(
      (u) => u.mood === mood || u.zodiac === zodiac
    );
    setResults(filtered);
  }, [mood, zodiac, users]);

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
        {results.map((u) => (
          <div key={u.id} className="friend-card">
            <img src={u.img} className="friend-img" alt="profile" />
            <h2>{u.name}</h2>
            <p>⭐ {u.zodiac}</p>
            <p>💫 Mood: {u.mood}</p>
            <button className="add-btn">Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
}
