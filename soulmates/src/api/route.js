import { supabase } from "../services/supabaseClient.js";

export const getUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data || [];
};