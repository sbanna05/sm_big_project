import { useEffect, useState } from "react"
import PopupMessage from "../components/PopupMessage"
import { getUsers } from "../api/route";

const Home = () => {
  //const { user, signOutUser } = UserAuth();
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

  user && console.log("User data:", user);

  return (
    <>
      <h1>Today’s Energies Are Speaking — Are You Listening?</h1>
      {user && (<PopupMessage starsign={user.starsign} user={user}/>)}
      {user && (
        <div className="user-greeting">
          <h2>Welcome back, {user.name} {user.starsign}!</h2>
          <p>Your stars are aligning for a day full of possibilities. Embrace the cosmic
            energy and let it guide you to new connections and adventures.</p>
        </div>
      )}
    </>
  )
}

export default Home

