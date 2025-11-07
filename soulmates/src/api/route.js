import { supabase } from "../services/supabaseClient.js";

export const getUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data || [];
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