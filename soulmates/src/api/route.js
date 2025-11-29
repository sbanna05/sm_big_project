import { supabase } from "../services/supabaseClient.js";
import { calculateBirthChart } from "../services/birthChartService.js";

export const getUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const getCurrentUser = async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  const userId = session?.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};


export const getLatestMood = async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("No logged-in user found.");
  }

  const { data, error } = await supabase
    .from("daily_moods")
    .select("*")
    .eq("user_id", userId)
    .order("logged_at", { ascending: false })
    .limit(1)
    .single();
  if (error) throw error;

  return data || null;
};


export const getMoods = async (user) => {
  if (!user || !user.id) {
    throw new Error("No valid user provided.");
  }

  const { data, error } = await supabase
    .from("daily_moods")
    .select("*")
    .eq("user_id", user.id)
    .order("logged_at", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data || null;
};


export const addUser = async (user) => {
  const { data, error } = await supabase
    .from("users")
    .insert([user])
    .select();
    if (error) throw error;
    return data[0];
}

export const updateUserProfile = async (userId, profileData) => {
  const { name, dob, birthplace, birthtime, pronoun } = profileData;

  const date_of_birth = dob ? new Date(dob).toISOString() : null;
  const time_of_birth = birthtime || null;

  // Számoljuk ki a birthchartot
  const { starsign, moonsign, ascendent } = calculateBirthChart(dob, birthtime);

  const { data, error } = await supabase
    .from("users")
    .update({
      name,
      date_of_birth,
      birthplace,
      time_of_birth,
      pronouns: pronoun,
      starsign,
      moonsign,
      ascendent,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};