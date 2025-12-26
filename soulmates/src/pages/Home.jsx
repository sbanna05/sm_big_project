import { useEffect, useState } from "react";
import PopupMessage from "../components/PopupMessage";
import { UserAuth } from "../context/AuthContext";
import { getCurrentUser, getMoods } from "../api/route";
import { getOrCreateUserDailyHoroscope } from "../services/horoscopeService.js";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient.js";

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

        const userId = currentUser.id;
        const starsign = currentUser.starsign;

        const latestMood = await getMoods(currentUser);
        const moodType = latestMood?.type || "calm";
        setMood(moodType);

        const text = await getOrCreateUserDailyHoroscope(
          userId,
          starsign,
          moodType
        );

        setDailyMessage(text);
        setHasNewMessage(!text.is_read);
      } catch (err) {
        console.error("Hiba az adatok betöltésekor:", err);
      }
    };

    fetchData();
  }, [loading, authUser]);

  const openDailyMessage = async () => {
    setShowPopup(true);
    if (dailyMessage && !dailyMessage.is_read) {
      setHasNewMessage(false);

      try {
        const { data, error } = await supabase
          .from("daily_horoscope")
          .update({ is_read: true })
          .eq("horoscope_id", dailyMessage.horoscope_id)
          .select()
          .single();

        if (error) throw error;

        // helyi state frissítése a frissített rekorddal
        setDailyMessage(data);
      } catch (err) {
        console.error("Hiba az is_read frissítésekor:", err);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Hiba a kijelentkezéskor:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  const hasAstroData = user && ((user.starsign && user.moonsign) || user.ascendent);

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
          message={dailyMessage.description}
          onClose={() => setShowPopup(false)}
        />
      )}

      {user && (
        <div className="user-greeting d-flex flex-column align-items-center mt-5">
          <h2>Welcome back, {user.name}!</h2>

          {hasAstroData ? (
            <>
              <p>
                Starsign: <strong>{user.starsign}</strong>, Moonsign:{" "}
                <strong>{user.moonsign}</strong>, Ascendent:{" "}
                <strong>{user.ascendent}</strong>
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
