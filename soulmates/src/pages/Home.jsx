import { useEffect, useState } from "react";
import PopupMessage from "../components/PopupMessage";
import { UserAuth } from "../context/AuthContext";
import { getCurrentUser } from "../api/route";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user: authUser, loading, signOutUser } = UserAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        console.log("Current user in Home:", currentUser);
      } catch (err) {
        console.error("Hiba a felhasználó lekérésekor:", err);
      }
    };

    fetchUser();
  }, [loading, authUser]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login"); // ✅ NAVIGÁLJ A KIJELENTKEZÉS UTÁN! }
    } catch (error) {
      console.error("Hiba a kijelentkezéskor:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="home-header d-flex justify-content-between align-items-center p-4">
        <h1>Today’s Energies Are Speaking — Are You Listening?</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {user && <PopupMessage starsign={user.starsign} user={user} />}

      {user && (
        <div className="user-greeting d-flex flex-column align-items-center mt-5">
          <h2>
            Welcome back, {user.name} ({user.starsign})!
          </h2>
          <p>Embrace the cosmic energy and explore new possibilities today!</p>
        </div>
      )}
    </>
  );
};

export default Home;
