# Funkcionális specifikáció - SoulMates

## 1. Projekt célja / Vágyálom

---

## 2. Általános leírás

### 2.1 Célcsoport

### 2.2 Fő funkciók

### 2.3 Rendszer környezete

---

## 3. Architektúrális terv

### 3.1 Rendszer moduljai

### 3.2 Adatáramlás / Adatmodell

> Röviden leírva az adatbevitel, tárolás és feldolgozás logikája.

### 3.3 Technológiai stack

- Backend:  
- Frontend:  
- Adatbázis:  
- Külső szolgáltatások / API-k:  

---

## 4. Funkcionális követelmények

### F1 – Regisztráció

**Leírás:**  
A felhasználó megadja személyes adatait (név, nem, születési dátum, idő és hely). Az alkalmazás ezek alapján létrehozza az AI személyes asztrológiai profilját.  
**Bemenetek:** név, nem, születési adatok, hely  
**Kimenet:** felhasználói profil, zodiákus azonosítók  
**Folyamat:**  

- 1.Felhasználó kitölti az űrlapot
- 2.Rendszer ellenőrzi az adatok formátumát  
- 3.API kiszámítja az asztrológiai profil elemeit  
- 4.Supabase-ben létrejön a felhasználói rekord  

---

### F2 – Zodiákus profil kalkuláció

**Leírás:**  
A rendszer kiszámítja a Napjegyet, Holdjegyet és Aszcendenst az aktuális csillagászati adatok alapján.  
**Függőségek:** AstroPy vagy Swiss Ephemeris API  
**Kimenet:** zodiac_profile (JSON formátumban)  
**Használat:** AI napi üzenet generálás, matching algoritmus  

---

### F3 – Mood / Habit log

A felhasználó 1–5 skálán értékeli hangulatát.
Az érték mentésre kerül a mood_logs táblába, majd az AI egy személyre szabott üzenetet generál, amely megjelenik a ‘Daily Insight’ panelen.
**Folyamat:**

- 1. Felhasználó megadja az aktuális hangulatát
- 2.Adat mentése Supabase `mood_logs` táblába  
- 3.AI rövid visszajelzést generál: pl. “Your energy aligns with today’s Moon in Gemini 🌙”  

**Kimenet:** mood_log + ai_feedback

---

### F4 – AI napi üzenet

**Leírás:**
Az AI (Gemini API) generál egy napi személyes horoszkóp üzenetet az asztrológiai profil és az aktuális bolygóállások alapján.
**Folyamat:**

- 1.Backend naponta egy Gemini API hívást indít minden aktív felhasználónak  
- 2.Prompt sablon: *"You are a creator at SoulMates, an AI astrologer. Generate a daily message for a [Zodiac sign], born in [Place], based on today’s alignments."*
- 3.Üzenet mentése Supabase `daily_messages` táblába  
**Kimenet:** rövid AI üzenet (1–2 mondat)  

### F5 – Interaktív popup

**Leírás:**A napi üzenet megjelenítése kaparós vagy más interaktív formában.  
**Technológia:** React + Framer Motion + react-scratchcard-js  
**Folyamat:**  

1. Felhasználó belép az alkalmazásba  
2. Popup aktiválódik (“Welcome Libra, the stars have a message for you ✨”)  
3. Kaparás után az AI üzenet felfedődik animációval  

### F6 – Felhasználói matching

**Leírás:**  
Az alkalmazás kompatibilitás és aktuális hangulat alapján ajánl más felhasználókat.  
**Algoritmus:**  

- Csillagjegy kompatibilitás (pl. levegő + tűz)  
- Hangulat-hasonlóság (mood score diff < 1)  
- AI generált “vibe score”  
**Kimenet:** ajánlott felhasználók listája  

### F7 – Chat / közösségi funkció

**Leírás:**Lehetővé teszi, hogy a felhasználók kapcsolatba lépjenek egymással.  
**Funkciók:** üzenetküldés, emoji reakciók, korlátozott AI moderáció  
**Függőségek:** Supabase Realtime API  
**Adatstruktúra:** `messages` tábla (sender_id, receiver_id, content, timestamp)  

### F8 – Értesítések

**Leírás:**A rendszer push értesítéseket küld: napi üzenet elérhető, új chat üzenet, új match.  
**Technológia:** Firebase Cloud Messaging vagy OneSignal  
**Beállítások:** értesítési engedélyek, testreszabás a profilban  

### F9 – Dashboard / statisztika

**Leírás:** Felhasználói trendek vizualizálása: hangulatgörbék, heti statisztika, AI által kiemelt minták.  
**Megjelenítés:** Recharts vagy Chart.js  
**Kimenet:** interaktív grafikonok, AI szöveges értelmezés

---

## 5. Nem-Funckionális Követelmények

---

## 6. Felhasználói történetek

> Rövid történetek, hogy a felhasználó hogyan használja a rendszert.

- Mint [szerep], szeretném [funkció], hogy [előny].  
- Mint [szerep], szeretném [funkció], hogy [előny].  

---

## 7. Tesztelési kritériumok / Megvalósíthatóság

### 7.1 Funkcionális tesztek

### 7.2 Teljesítmény és biztonság

### 7.3 Felhasználói elfogadás
---

## 8. Kommentek / Kiegészítések

> Ide kerülhetnek az extra megjegyzések, például:
- Fejlesztési javaslatok  
- Felhasználói visszajelzések integrálása  
- Architektúrális megfontolások  
