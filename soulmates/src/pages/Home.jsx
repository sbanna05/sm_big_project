import { useEffect, useState } from "react";
import PopupMessage from "../components/PopupMessage";
import { UserAuth } from "../context/AuthContext";
import { getCurrentUser, getMoods } from "../api/route";
import { getDailyHoroscope } from "../services/aiService.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user: authUser, loading, signOutUser } = UserAuth();
  const [user, setUser] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const [dailyMessage, setDailyMessage] = useState(null);
  const [mood, setMood] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!authUser) return;

    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const userId = currentUser?.id;
        const starsign = currentUser?.starsign;

        // Mood lekérés
        const latestMood = await getMoods(currentUser);
        const moodType = latestMood?.type || "calm";
        setMood(moodType);

        // LocalStorage kulcsok user ID szerint
        const dateKey = `dailyMessageSeen_${userId}`;
        const textKey = `dailyMessageText_${userId}`;

        const lastSeen = localStorage.getItem(dateKey);
        const today = new Date().toDateString();

        const isNew = lastSeen !== today;
        setHasNewMessage(isNew);

        if (isNew && starsign) {
          // Új AI üzenet generálása
          const msg = await getDailyHoroscope(starsign, mood);
          setDailyMessage(msg);
        } else {
          // Ma már látta visszatöltjük a mentett üzenetet
          const savedMsg = localStorage.getItem(textKey);
          setDailyMessage(savedMsg || null);
        }
      } catch (err) {
        console.error("Hiba az adatok lekérésekor:", err);
      }
    };

    fetchData();
  }, [loading, authUser]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Hiba a kijelentkezéskor:", error);
    }
  };

  const openDailyMessage = () => {
    if (!user) return;

    const userId = user.id;
    const today = new Date().toDateString();

    const dateKey = `dailyMessageSeen_${userId}`;
    const textKey = `dailyMessageText_${userId}`;

    localStorage.setItem(dateKey, today);

    if (dailyMessage) {
      localStorage.setItem(textKey, dailyMessage);
    }

    setHasNewMessage(false);
    setShowPopup(true);
  };

  if (loading) return <p>Loading...</p>;

  const hasAstroData = user && (user.starsign && user.moonsign || user.ascendent);

  return (
    <>
      <div className="home-header d-flex justify-content-between align-items-center p-4">
        <h1>Today’s Energies Are Speaking — Are You Listening?</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="daily-btn" onClick={openDailyMessage}>
          Daily Message
          {hasNewMessage && <i className="has-message">!</i>}
        </button>
      </div>

      {showPopup && dailyMessage && (
        <PopupMessage
          message={dailyMessage}
          onClose={() => setShowPopup(false)}
        />
      )}

      {user && (
        <div className="user-greeting d-flex flex-column align-items-center mt-5">
          <h2>Welcome back, {user.name}!</h2>

          {hasAstroData ? (
            <>
              <p>
                Starsign: <strong>{user.starsign}</strong>,{" "}
                Moonsign: <strong>{user.moonsign}</strong>,{" "}
                Ascendent: <strong>{user.ascendent}</strong>
              </p>
              <p>Your mood today is: <strong>{mood}</strong></p>
            </>
          ) : (
            <button
              className="profile-btn"
              onClick={() => navigate("/profile")}
            >
              Fill in your profile to get your astrological data
            </button>
          )}

          <p>Embrace the cosmic energy and explore new possibilities today!</p>
        </div>
      )}
    </>
  );
};

export default Home;
