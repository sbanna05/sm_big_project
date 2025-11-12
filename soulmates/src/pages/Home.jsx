import { useEffect, useState } from "react";
import PopupMessage from "../components/PopupMessage";
import { UserAuth } from "../context/AuthContext";
import { getCurrentUser } from "../api/route";

const Home = () => {
  const { user: authUser, loading } = UserAuth();
  const [user, setUser] = useState(null);

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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Today’s Energies Are Speaking — Are You Listening?</h1>
      {user && <PopupMessage starsign={user.starsign} user={user} />}
      {user && (
        <div className="user-greeting">
          <h2>Welcome back, {user.name} ({user.starsign})!</h2>
          <p>Embrace the cosmic energy and explore new possibilities today!</p>
        </div>
      )}
    </>
  );
};

export default Home;
