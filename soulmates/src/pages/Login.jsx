import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signInUser } = UserAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    const result = await signInUser(email, password);
    if (!result.success) {
      setError(result.error.message);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="container pt-5" style={{ maxWidth: "500px" }}>
      <h2 className="fw-bold mb-3">Bejelentkezés</h2>
      <p>
        Még nincs fiókod? <Link to="/signup">Regisztrálj</Link>
      </p>
      <form onSubmit={handleSignIn}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Jelszó"
          className="form-control mb-3"
          required
        />
        <button className="btn btn-primary w-100">Bejelentkezés</button>
      </form>
      {error && <p className="text-danger text-center pt-3">{error}</p>}
    </div>
  );
};

export default Login