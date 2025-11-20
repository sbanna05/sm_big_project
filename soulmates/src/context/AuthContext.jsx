import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user || null)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // ✅ Új user regisztráció
  const signUpNewUser = async (email, password, name) => {
    try {
      // 1️⃣ Auth user létrehozása
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }, // opcionális metaadat
      });

      if (error) return { success: false, error };
      if (!data.user)
        return {
          success: false,
          error: new Error("No user returned from signUp"),
        };

      // 2️⃣ Users tábla frissítése
      const { data: newUser, error: dbError } = await supabase
        .from("users")
        .insert([
          {
            id: data.user.id, // Auth user ID
            name: name,
            email: email, // email szükséges lehet NOT NULL miatt
            starsign: null, // opcionális
          },
        ])
        .select()
        .maybeSingle();

      if (dbError) return { success: false, error: dbError };

      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { success: false, error };
    return { success: true, user: data.user };
  };

  const signOutUser = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signUpNewUser, signInUser, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
