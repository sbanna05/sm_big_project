import { supabase } from "./supabaseClient.js";
import { getDailyHoroscope } from "./aiService.js";

export async function getOrCreateUserDailyHoroscope(userId, starsign, mood) {
  const today = new Date().toISOString().split("T")[0];
  const startOfDay = `${today}T00:00:00`;
  const endOfDay = `${today}T23:59:59`;

  // Létezik-e már MAI horoszkóp?
  const { data: existing, error } = await supabase
    .from("daily_horoscope")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", startOfDay)
    .lte("created_at", endOfDay)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) throw error;

  // Ha van → teljes rekord visszaadása
  if (existing && existing.length > 0) {
    return existing[0];
  }

  // Nincs → új horoszkóp generálása és elmentése
  const text = await getDailyHoroscope(starsign, mood);

  const { data: inserted, error: insertError } = await supabase
    .from("daily_horoscope")
    .insert([
      {
        user_id: userId,
        starsign,
        description: text,
        created_at: today,
        is_read: false,
      },
    ])
    .select()
    .single();

  if (insertError) throw insertError;

  return inserted;
}
