import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex gap-4 p-4 bg-gray-100 shadow-md navbar">
      <div className="logo">✨ SoulmMates ✨</div>
      <ul className="flex gap-4">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
       <li>
          <NavLink to="/reading" className={({ isActive }) => (isActive ? "active" : "")}>
            Reading
          </NavLink>
       </li>
       <li>
          <NavLink to="/moodboard" className={({ isActive }) => (isActive ? "active" : "")}>
            Daily Mood
          </NavLink>
       </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/friends" className={({ isActive }) => (isActive ? "active" : "")}>
            Friends
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
