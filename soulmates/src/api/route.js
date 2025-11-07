import { supabase } from "./supabaseClient.js";

export const getUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("user_id", { ascending: true });

  if (error) throw error;
  return data || [];
};