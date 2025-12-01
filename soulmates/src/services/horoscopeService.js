import { supabase } from "./supabaseClient.js";
import { getDailyHoroscope } from "./aiService.js";

export async function getOrCreateUserDailyHoroscope(userId, starsign, mood) {
  const today = new Date().toISOString().split("T")[0];

  //Megnézzük: van-e a mai napra horoszkóp a user-nek
  const { data: existing, error } = await supabase
    .from("daily_horoscope")
    .select("*")
    .eq("user_id", userId)
    .eq("created_at", today)
    .maybeSingle();

  if (error) throw error;

  if (existing) {
    return existing.description;
  }

  const text = await getDailyHoroscope(starsign, mood);

  const { error: insertError } = await supabase
    .from("daily_horoscope")
    .insert([
      {
        user_id: userId,
        starsign,
        description: text,
        created_at: today
      }
    ]);

  if (insertError) throw insertError;

  return text;
}
