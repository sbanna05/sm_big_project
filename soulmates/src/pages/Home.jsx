import { useEffect, useState } from "react"
import PopupMessage from "../components/PopupMessage"
import { getUsers } from "../api/route";

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      getUsers().then((data) => {
        if (data.length > 0) {
          setUser(data[0]); // Assuming we take the first user for demo purposes
        }
      });
    }
    fetchUser();
  }, []);

  


  return (
    <>
      <h1>Today’s Energies Are Speaking — Are You Listening?</h1>
      <PopupMessage message="Love is on the horizon! Keep your heart open and your spirit adventurous." />
      {user && (
        <div className="user-greeting">
          <h2>Welcome back, {user.name}!</h2>
          <p>Your stars are aligning for a day full of possibilities. Embrace the cosmic
            energy and let it guide you to new connections and adventures.</p>
        </div>
      )}
    </>
  )
}

export default Home

