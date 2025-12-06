import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import MoodBoard from "./pages/MoodBoard";
import Reading from "./pages/Reading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";

import { useLocation } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import MoodGraph from "./components/MoodGraph";

function Layout() {
  const { user, loading } = UserAuth();
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/signup"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && !loading && user && <Header />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <div>Loading...</div>
              ) : user ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
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
    <AuthContextProvider>
      <Router>
        <Layout />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
