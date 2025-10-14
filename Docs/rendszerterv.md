# SoulMates Application Rendszerterv

## 4. Fizikai környezet

- **Szerveroldal / Backend:**  
  - Supabase szolgáltatás: PostgreSQL adatbázis, Auth, Storage, Realtime  
  - Hosted cloud környezet (Supabase cloud)  
  - SSL titkosított kommunikáció minden adatátvitelhez  
  - Automatikus backup és snapshot naponta  
  - Hálózati redundancia: több adatközpont használata  

- **Kliensoldal / Frontend:**  
  - React SPA (Single Page Application) a felhasználói eszközön  
  - Reszponzív design: mobil, tablet, desktop  
  - Böngészőkövetelmények: Chrome, Firefox, Edge, Safari (legfrissebb két verzió)  
  - Offline cache: PWA manifest a gyors betöltéshez  

- **AI integráció:**  
  - Gemini AI vagy OpenAI GPT-5 mini API a napi üzenetek generálásához  
  - HTTPS alapú hívások backendről  
  - Cache a gyakori promptokhoz a gyors válaszidő érdekében  

- **Értesítési rendszer:**  
  - Firebase Cloud Messaging / OneSignal  
  - Push notification engedélyek kezelése a kliens oldalon  

```mermaid
flowchart TD
    %% Felhasználói réteg
    A[👤 Felhasználó<br/>(Browser / Mobil)] 
        -->|HTTP / HTTPS| B[💻 React Frontend<br/>(SPA alkalmazás)]

    %% Frontend → Backend kapcsolat
    B -->|REST / Fetch API hívások| C[🧩 Supabase Backend<br/>(Auth + PostgreSQL + Storage)]

    %% Backend belső komponensek
    C -->|SQL lekérdezések<br/>adatmentés| D[(🗄️ PostgreSQL Adatbázis)]
    C -->|Fájlkezelés / profilképek| E[(🗂️ Supabase Storage)]

    %% AI integrációs réteg
    C -->|API Request (JSON prompt)| F[🔮 Gemini AI API<br/>(napi horoszkóp üzenet generálás)]
    F -->|AI Response (üzenet)| C

    %% Frontendre való visszatérés
    C -->|Válasz JSON formátumban| B
    B -->|Megjelenítés: Popup, Dashboard, Matching| A
```

---

## 5. Implementációs terv

### Frontend

- **Technológia:** React 18 + react-router-dom + Bootstrap 5  
- **Komponensek felépítése:**  
  - `/components` – újrafelhasználható UI elemek (gombok, popup, card)  
  - `/pages` – főoldal, dashboard, profil, chat  
  - `/hooks` – state kezelés, mood log, AI API hívások  
- **UI/UX irányelvek:**  
  - Modern, misztikus-futurista színek és tipográfia
    - css színek:

    ```css
        --primary-color: #780081;
        --bg-color: #110049;
        --secondary-color: #fec3f1;
        --font-color: #c1f0f6;
        --star-color: #36ffeb
        --gold-color: #ffbf00
    ```

  - Animációk Framer Motion-nal  
  - Kaparós popup az AI napi üzenethez  

- **Adatkezelés:**  
  - Supabase REST API hívások a profil, mood log és daily message kezeléséhez  
  - Realtime funkciók: chat és mood log frissítése  
  - Async/await és React state management (useState, useEffect, useReducer)  
- **Login:**
  - Vezetéknév, keresztév
  - Születési dátum, hely, idő (ha tudja, opcionális)
  - Nem (she/her; he/him, they/them)

### Backend

- **Technológia:** Supabase cloud + PostgreSQL  
- **Adatszerkezet:**  
  - `users`: felhasználói profiladatok  
  - `mood_logs`: hangulatnapló  
  - `daily_messages`: AI napi üzenetek  
  - `matches`: barát ajánlások  

- **Biztonság és jogosultság:**  
  - Supabase Auth + JWT tokenek  
  - Row-level security minden táblán  
  - HTTPS minden kliens-backend kommunikációhoz

### AI integráció

- Backend API hívások a napi üzenetekhez  
- Prompt sablonok és cache használat a válaszidő optimalizálására  
- AI üzenetek mentése Supabase `daily_messages` táblába  

### Értesítések

- Firebase Cloud Messaging vagy OneSignal integráció  
- Push értesítések napi üzenethez, új chat üzenetekhez, új match-hez  
- Felhasználói beállítások: engedélyezés / tiltás  

---

## 6. Funkcionális követelmények részletes leírása

- **Regisztráció / Onboarding:**  
  - Űrlap validáció: név, nem, születési dátum/idő/hely  
  - AI profil generálása Supabase triggerrel  

- **Zodiákus profil kalkuláció:**  
  - Napjegy, Holdjegy, Aszcendens  
  - Bolygóállások lekérése AstroPy vagy Swiss Ephemeris API segítségével  
  - JSON struktúrában tárolás  

- **Mood / Habit log:**  
  - Felhasználói input 1–5 skálán  
  - Mentés Supabase `mood_logs` táblába  
  - Esetleg Grafikon generálás: Chart.js vagy Recharts, időszak szerint szűrhető  

- **AI napi üzenet:**  
  - Backend API hívás minden aktív felhasználónak  
  - Rövid, személyre szabott üzenet  
  - Mentés Supabase `daily_messages` táblába  

- **Interaktív popup:**  
  - Kaparós vagy animált felfedés  
  - Framer Motion + react-scratchcard-js  

- **Felhasználói matching:**  
  - Algoritmus: csillagjegy kompatibilitás + hangulat + AI vibe score  
  - Ajánlások megjelenítése a frontend-en  
  - Elfogadás/elutasítás kezelése, kapcsolati fa frissítése  

- **Chat / közösségi funkció:**  
  - Supabase Realtime API  
  - Üzenetküldés, emoji reakciók  
  - Notifikáció érkezéskor  

- **Értesítések:**  
  - Push notification testreszabás a profilban  
  - Értesítési preferenciák mentése Supabase-ben  

- **Dashboard / statisztika:**  
  - Interaktív grafikonok hangulat- és AI trendekről  
  - AI szöveges kiértékelés  

---

### Biztonság és adatvédelem

- HTTPS minden kommunikációhoz  
- JWT token alapú session kezelés  
- Row-level security Supabase táblákban  
- Felhasználói adat törlés/export lehetőség  
- GDPR kompatibilitás  
- Adat anonimizálás 90 nap után (opcionális)  

---

### Teljesítmény és skálázhatóság

- Popup betöltés <1 mp  
- AI generálás <2–5 mp  
- Realtime chat és mood log frissítés <1 mp  
- Skálázható Supabase infrastruktúra akár 10k+ aktív felhasználóig  
- Lazy load komponensek a frontend teljesítmény optimalizálásához  

---
