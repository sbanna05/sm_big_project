import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    //Első session betöltése frissítés után
    supabase.auth.getSession().then(({ data }) => {
      if (!ignore) {
        setUser(data.session?.user || null);
        setLoading(false);
      }
    });

    // Session változás figyelése
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  const signUpNewUser = async (email, password, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) return { success: false, error };
      if (!data.user)
        return { success: false, error: new Error("No user returned from signUp") };

      const { error: dbError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          name,
          email,
          starsign: null,
        },
      ]);

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
