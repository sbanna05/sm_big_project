import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import MoodBoard from "./pages/MoodBoard";
import Reading from "./pages/Reading";
import MoodGraph from "./components/MoodGraph";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/moodboard" element={<MoodBoard />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/graph" element={<MoodGraph />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
