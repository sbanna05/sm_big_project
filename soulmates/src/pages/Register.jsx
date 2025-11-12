import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { addUser } from "../api/route";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signUpNewUser(email, password, name);
      if (result.success) {
        await addUser({ name, email });
        navigate("/login");
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err.message || "Ismeretlen hiba");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pt-5" style={{ maxWidth: "500px" }}>
      <h2 className="fw-bold mb-3">Regisztráció</h2>
      <p>
        Már van fiókod? <Link to="/login">Jelentkezz be</Link>
      </p>

      <form onSubmit={handleSignUp}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          required
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Név"
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
        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Folyamatban..." : "Regisztráció"}
        </button>
      </form>

      {error && <p className="text-danger text-center pt-3">{error}</p>}
    </div>
  );
};

export default Register;

