# Követelmény specifikáció - SoulMates

## 1. Jelenlegi helyzet

### 1.1. Teendők nyilvántartása

## 2. Megrendelői vízió (Vágyálom)

### 2.1 Áttekintés

A megrendelő célja egy modern, mesterséges intelligencia alapú, asztrológiai közösségi alkalmazás fejlesztése, amely túlmutat a hagyományos horoszkóp applikációkon.
A piacon jelenleg elérhető megoldások többsége statikus, előre generált tartalmakat kínál, amelyek nem alkalmazkodnak a felhasználók aktuális érzelmi vagy élethelyzetéhez.
A projekt víziója egy olyan dinamikus platform, amely az asztrológiát, az önismeretet és a közösségi élményt ötvözi egy esztétikus, trendkövető környezetben.

### 2.2 Megrendelői vágyak

A megrendelő szeretné, hogy az alkalmazás minden nap személyre szabott, AI által generált horoszkóp üzenetet kínáljon, amely tükrözi a felhasználó aktuális hangulatát és csillagjegyét.
Az app támogatja a napi hangulat- és szokásnaplózást, ezzel segítve az önreflexiót és a tudatos életvitelt.
A közösségi modul célja, hogy a felhasználók hasonló érdeklődésű, azonos vagy kompatibilis jegyű emberekkel kapcsolódhassanak pozitív, támogató formában.
A megrendelő szeretné, ha a felhasználók hosszú távon is visszatérnének az alkalmazásba, és az app napi digitális társukká válna.

### 2.3 Nem-funkcionális vágyak

A megrendelő elvárja, hogy az alkalmazás modern technológiákra épüljön (React, Node.js, AI API-k), gyorsan reagáljon és magas rendelkezésre állást biztosítson.
Az adatok kezelése biztonságos, GDPR-kompatibilis módon történjen.
Az AI alapú generálás maximum 2 másodperc alatt fusson le, a felület pedig mobilon és weben is reszponzív legyen.
Fontos szempont a letisztult, misztikus-futurista UI/UX, amely vizuálisan vonzó és közösségi médiában is könnyen megosztható.

### 2.4 Elfogadási kritériumok

A projekt akkor tekinthető sikeresnek, ha:
- a felhasználók regisztráció után személyre szabott asztrológiai profilt kapnak,
- az AI napi szinten egyedi horoszkóp üzenetet generál,
- a mood/habit napló funkció működőképes és adatot ment,
- az interaktív napi popup élményt nyújt,
- a rendszer stabilan működik legalább 1000 felhasználóval,
- az AI-generálás gyors és hibamentes,
- a UI esztétikus, modern és reszponzív,
- a felhasználói adatok biztonságosan tárolódnak.

## 3. Jelenlegi üzleti folyamat

- A **felhasználó** megadja a születése időpontját és helyszínét.
- Ezen adatok alapján a rendszer meghatározza a **felhasználó** horoszkópját.
- Megjelenik a **felhasználó** általános napi horoszkópja.
- Minden **felhasználó**, akiknek megegyezik a horoszkópja ugyanazt az üzenetet láttja. 
- Nem személyreszabott az üzenet így, a **felhasználó** nem érez késztetést arra, hogy naponta felkeresse az oldalt.
- A rendszer nem küld értesítést a napi üzenet megtekentíséről.
- A rendszer nem tárolja se a **felhasználó** adatait, se a napi horoszkópokat.
- A rendszer **felhasználói** nem tudnak a felületen egymással kapcsolatba lépni.
- A **felhasználó** nem tudja naplózni a hangulatát.

## 4. Igényelt üzleti folyamat

- A **felhasználó** beregisztrál az oldalra, így a rendszer el tudja menteni a hozzá tartozó adatokat.
- A **felhasználó** megadja a pontos születési időpontját, valalmint helyszínét.
- A rendszer meghatározza a pontos horoszkópját és eltárolja.
- A **felhasználó** minden nap megadhatja a hangulatát.
- A rendszer a napi horoszkóp és hangulat kombinációjából személyre szabott napi üzenetet állít össze.
- A napi üzenetek visszakereshetőek.
- A **felhasználó** grafikon alapján nyomon tudja követni a hangulat változásait.
- A rendszer barátokat ajánl a horoszkóp és szokásos hangulat alapján.
- A barátajánlást a **felhasználó** elfogadhatja vagy elutasíthatja.
- A barátok cseveghetnek egymással.
- A rendszer értesítést küld a **felhasználónak** a napi üzenetről és a barátajánlásról.
- A rendszer elemzi a kapott adatokat és a **felhasználó** visszajelzései alapján finomíthat a személyreszabott üzeneteken.

## 5. Követelmény Lista

### 5.1 Funkcionális követelmények

| Modul ID | Név | V. | Kifejtés |
|-----------|-----|---|-----------|
| F1 | Regisztráció | 1.0 | Név, nem, születési adatok (dátum, hely), AI profil generálása |
| F2 | Zodiákus profil kalkuláció | 1.0 | Napjegy, Holdjegy, Aszcendens + bolygóállások |
| F3 | Mood / Habit log | 1.0 | Hangulat, napi szokások naplózása, rövid jegyzet |
| F4 | AI napi üzenet | 1.0 | Gemini AI API használata, személyre szabott horoszkóp üzenet |
| F5 | Interaktív popup | 1.0 | Kaparós vagy más vizuális élmény a napi üzenethez |
| F6 | Felhasználói matching | 1.0 | Használó ajánlások kompatibilitás, hangulat és érdeklődés alapján |
| F7 | Chat / közösségi funkció | 1.0 | Felhasználók egymással való kapcsolatfelvétel |
| F8 | Értesítések | 1.0 | Push notification a napi horoszkóphoz |
| F9 | Dashboard / statisztika | 1.0 | Hangulatgörbe, trendek vizualizációja |

### 5.2 Nem-funkcionális követelmények

| Modul ID | Név | V. | Kifejtés |
|-----------|-----|---|-----------|
| NF1 | Platform | 1.0 | Web (React/Next.js) + mobil (React Native) |
| NF2 | Backend | 1.0 | Node.js + Supabase (PostgreSQL + Auth + Storage) |
| NF3 | AI integráció | 1.0 | Gemini AI API vagy OpenAI GPT-5 mini |
| NF4 | Biztonság | 1.0 | GDPR-kompatibilis, titkosított adatbázis, felhasználói adatok védelme |
| NF5 | Teljesítmény | 1.0 | AI generálás < 2-5 mp, napi popup gyors betöltés |
| NF6 | Skálázhatóság | 1.0 | Támogatás akár 10k+ felhasználóig |
| NF7 | UI/UX | 1.0 | Modern, misztikus-futurista, esetleges animációk (pl Framer Motion) |
| NF8 | Logging / Analytics | 1.0 | Felhasználói viselkedés, engagement, AI interakciók rögzítése |

## 6. Felhasználói történetek

> Rövid történetek, hogy a felhasználó hogyan használja a rendszert.

## 7. Megvalósíthatóság / tesztelési kritériumok
