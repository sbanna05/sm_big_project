# Funkcionális specifikáció - SoulMates

## 1. Projekt célja / Vágyálom

### 1.1 Áttekintés

A rendszer célja egy **mesterséges intelligencia alapú** asztrológiai alkalmazás,
amely interaktív módon nyújt **napi horoszkóp-élményt**, önreflexiós lehetőséget
és közösségi kapcsolódást.
A fejlesztés fókuszában az áll, hogy a felhasználó minden nap
**egyedi, személyre szabott tartalmat** kapjon, miközben egy intuitív,
modern és játékos felületet használ.
Az alkalmazás fő moduljai a regisztráció, a horoszkóp-generálás,
a mood/habit napló, az interaktív napi popup és a statisztikai dashboard.
Minden funkció célja, hogy a felhasználót hosszú távon elkötelezze.

### 1.2 Funkcionális vágyak

A megrendelő szeretné, hogy az alkalmazás:
- biztosítson **gyors** és **egyszerű regisztrációt**,
- generáljon **AI-alapú, napi horoszkóp üzenetet**,
- tegye lehetővé a **hangulatnaplózást**,
- jelenítsen meg **interaktív, kaparós napi üzenetet**,
- ajánljon **hasonló érdeklődésű** felhasználókat közösségi élményhez,
- tartalmazzon **statisztikai** és **trendnézetet** a felhasználói adatokhoz,
- küldjön **értesítéseket** a napi tartalomról,
- és integrálódjon **modern AI** és **adatbázis technológiákkal**.
A cél, hogy az alkalmazás ne csak információt adjon,
hanem inspiráló napi digitális rituálévá váljon.

### 1.3 Nem-funkcionális vágyak

A rendszer legyen:
- **gyors** (AI-generálás < 2 másodperc),
- **biztonságos** (GDPR, titkosított adatbázis),
- **stabil** (1000+ felhasználó támogatása),
- **reszponzív** (mobil és web egyaránt),
- **modern** (React, Node.js, Supabase architektúra),
- **vizuálisan vonzó** (misztikus-futurista UI/UX),
- **felhasználóbarát** (egyszerű navigáció, animált elemek).
A dizájn célja, hogy a felhasználó **szívesen térjen vissza** nap mint nap.

### 1.4 Elfogadási kritériumok

**A projekt akkor tekinthető funkcionálisan teljesnek, ha:<br>**
&#128504; A felhasználók sikeresen regisztrálhatnak és létrejön az AI-profil.<br>
&#128504; Az AI napi egyedi horoszkóp üzenetet generál.<br>
&#128504; A mood/habit napló működik és adatot ment.<br>
&#128504; Az interaktív popup megjelenik és reszponzív.<br>
&#128504; A statisztikai dashboard helyesen számítja a trendeket.<br>
&#128504; Az értesítések működnek és testreszabhatók.<br>
&#128504; A rendszer hiba nélkül működik 1000+ felhasználó esetén.<br>
&#128504; A UI/UX megfelel a modern design elvárásoknak.

## 2. Általános leírás

### 2.1 Célcsoport

### 2.2 Fő funkciók

### 2.3 Rendszer környezete

---

## 3. Igényelt üzleti folyamat
- A felhasználó a bejelentkezéskör egy űrlap kitöltésével saját profilt hozz létre.
- A megadott adatok alapján a rendszer pontosan kiszámolja a felhasználó horoszkópját.
    - A meghatározott horoszkóp mentésre kerül és eltárolja a rendszer a felhasználó személyes adataival.
    - Ehhez a felhasználó bejelentkezést követően hozzáfér.
    - Később a felhasználó módosíthatja személyes adatait.
- A felhasználó naplózhatja napi hangulatát.
    - A naplózásról a rendszer értesítést küld.
    - A naplózás eredményét a rendszer eltárolja.
    - Grafikon által kiértékelésre kerül.
        - A grafikon időszak szerint szűrhető (*nap*, *hét*, *hó*).
- A felhasználó napi hangulata és horoszkópja alapján a rendszer napi üzenetet generál.
    - Ez az üzenet minden felhasználó számára személyre szabott.
    - A rendszer menti a napi üzenetet így ez visszanézzhető.
- A rendszer elemzést készít a felhasználó által megadott napi hangulatok adataiból.
- A rendszer a hangulati minta és a horoszkóp alapján barátot ajánl.
    - A felhasználó elfogadhatja vagy elutasíthattja az adott ajánlást.
    - Az elfogadott barátok bekerülnek a felhasználó kapcsolati fájába.
        - A rendszer felületet biztosít a barátok közötti csevegésre.
        - A rendszer értesítést küld, ha új üzenet érkezik.
            - A felhasználó beállításokat végezhet az értesítéseken:
                - *Engedélyezés*
                - *Tiltás*
- A rendszer eltárolja a felhasználói aktivitást.
    - Az adatokat biztonságos adatbázisban kerülnek eltárolásra.
- A rendszer tanul a felhasználói visszajelzésekből.
    - A tanulás célja a személyre szabott üzenetek finomítása.
    - Célja, hogy növelje a felhasználó napi aktivitást.
    - A visszajelzések beépülnek az ajánlási algoritmusba.
- A rendszer elemzi a naplózot hangulat és a horoszkóp közötti összefüggéseket.

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

### 5.2 Nem-funkcionális követelmények – Funkcionális specifikáció

#### NF1 – Platform

**Verzió:** 1.0  
**Leírás:**  
A rendszer egy **React alapú SPA** (Single Page Application) webalkalmazás, opcionálisan mobil-reszponzív változatban.  
**Funkciók és részletek:**  

- Kliens oldali routing: `react-router-dom`  
- Reszponzív design: Bootstrap 5 grid + egyedi CSS változók  
- Offline cache alap: PWA támogatás a gyorsabb betöltéshez  
- Céleszközök: desktop, tablet, mobil  

---

#### NF2 – Backend

**Verzió:** 1.0  
**Leírás:**  
A backend a **Supabase** szolgáltatásra épül.  
**Funkcionális részletek:**  

- **Adatbázis:** PostgreSQL (Supabase)  
- **Autentikáció:** Supabase Auth (email, OAuth)  
- **Tárolás:** Supabase Storage (profilképek, AI üzenetek)  
- **Realtime funkciók:** chat, mood log frissítés  
- API endpointok:  
  - `POST /register` – felhasználó létrehozása  
  - `POST /mood` – hangulat mentése  
  - `GET /dailyMessage` – AI üzenet lekérése  
  - `GET /match` – felhasználói ajánlások  

---

#### NF3 – AI integráció

**Verzió:** 1.0  
**Leírás:**  
A Gemini AI vagy OpenAI GPT-5 mini API segítségével generáljuk a személyre szabott horoszkóp üzeneteket.  
**Funkcionális részletek:**  

- Input: felhasználói zodiákus profil, hangulat, dátum  
- Output: rövid, személyre szabott napi üzenet  
- Integráció: frontend hívja a backend API-t, ami továbbküldi az AI API-nak  
- Optimalizálás: válaszidő < 2–5 mp, cache használat a gyakori promptokhoz  

---

#### NF4 – Biztonság

**Verzió:** 1.0  
**Leírás:**  
A felhasználói adatok védelmét és GDPR-kompatibilitást biztosítjuk.  
**Funkcionális részletek:**  
- HTTPS minden kommunikációhoz  
- Felhasználói adatok titkosítása Supabase AES segítségével  
- JWT tokenek a session kezelésére  
- Row-level security a Supabase táblákban  
- Felhasználói adat törlés/export lehetősége a profilban  

---

#### NF5 – Teljesítmény

**Verzió:** 1.0  
**Leírás:**  
Az alkalmazás gyors és folyamatos felhasználói élményt biztosít.  
**Funkcionális részletek:**  

- Popup betöltés: < 1 mp  
- AI üzenet generálás: < 2–5 mp  
- React lazy loading komponensek  
- Optimalizált CSS és Bootstrap használat  
- Async API hívások, memoization (useMemo / useCallback)  

---

#### NF6 – Skálázhatóság

**Verzió:** 1.0  
**Leírás:**  
A rendszer képes 10k+ aktív felhasználó kiszolgálására.  
**Funkcionális részletek:**  

- Supabase autoscaling a PostgreSQL táblákhoz  
- Realtime funkciók load balancing (chat, mood log)  
- Edge caching az AI napi üzenetekhez  
- Load teszt: 1000+ egyidejű felhasználó  

---

#### NF7 – UI/UX

**Verzió:** 1.0  
**Leírás:**  
Modern, misztikus-futurista felület animációkkal.  
**Funkcionális részletek:**  
- Színpaletta: Primary *lila*, secondary: *kék*, *zöld*
- Betűtípus: Inter, Space Grotesk  
- Popup animáció: Framer Motion  
- Komponensek: Bootstrap card, modál, gombok  
- Reszponzív interakció: touch + click

#### NF8 – Logging / Analytics

**Verzió:** 1.0  
**Leírás:**  
A rendszer nyomon követi a felhasználói viselkedést és engagementet.  
**Funkcionális részletek:**

- Események: belépés, mood log, popup megtekintés, AI üzenet interakció  
- Naplózás: Supabase logs + egyszerű GA4 vagy Plausible integráció  
- Adatmegőrzés: 90 nap után anonimizálás  
- Admin hozzáférés: csak jogosult szerepkörrel  

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
