import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex gap-4 p-4 bg-gray-100 shadow-md navbar">
      <div className="logo">✨ My Energy App</div>
      <ul className="flex gap-4">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/reading" className={({ isActive }) => (isActive ? "active" : "")}>
          Reading
        </NavLink>
        <NavLink to="/moodboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Daily Mood
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          Profile
        </NavLink>
        <NavLink to="/friends" className={({ isActive }) => (isActive ? "active" : "")}>
          Friends
        </NavLink>
      </ul>
    </header>
  );
};

export default Header;
