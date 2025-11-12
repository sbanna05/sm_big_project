import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import MoodBoard from "./pages/MoodBoard";
import Reading from "./pages/Reading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/moodboard" element={<MoodBoard />} />
          <Route path="/reading" element={<Reading />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Layout />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
