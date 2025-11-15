import { useState, useEffect } from "react";
import "../assets/profile.css";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../services/supabaseClient";
import { updateUserProfile } from "../api/route";

const Profile = () => {
  const { user } = UserAuth();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    birthplace: "",
    birthtime: "",
    pronoun: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      setFormData({
        name: data.name || "",
        dob: data.date_of_birth ? data.date_of_birth.split("T")[0] : "",
        birthplace: data.birthplace || "",
        birthtime: data.time_of_birth || "",
        pronoun: data.pronouns || "",
      });
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) throw new Error("User not logged in");

      await updateUserProfile(user.id, formData);

      alert("Profile saved successfully ✨");
    } catch (err) {
      console.error("Profile update error:", err.message);
      alert("Error saving profile: " + err.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Welcome at <span>SoulMates</span></h2>
        <p className="subtitle">where stars align and souls connect</p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            name="name"
            placeholder="username"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Date of Birth</label>
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />

          <label>Birthplace</label>
          <input
            name="birthplace"
            placeholder="City, Country"
            value={formData.birthplace}
            onChange={handleChange}
          />

          <label>Time of Birth</label>
          <input
            name="birthtime"
            type="time"
            value={formData.birthtime}
            onChange={handleChange}
          />

          <label>Pronouns</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="pronoun"
                value="she"
                checked={formData.pronoun === "she"}
                onChange={handleChange}
              /> She
            </label>
            <label>
              <input
                type="radio"
                name="pronoun"
                value="he"
                checked={formData.pronoun === "he"}
                onChange={handleChange}
              /> He
            </label>
            <label>
              <input
                type="radio"
                name="pronoun"
                value="they"
                checked={formData.pronoun === "they"}
                onChange={handleChange}
              /> They
            </label>
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
