# Tesztelési jegyzőkönyv

### T01:

| Mező | Tartalom |
|------|----------|
| *A teszt-eset leírás és célja:* | Ellenőrizzük, hogy a **Login** komponens helyesen megjeleníti a bejelentkezési űrlapot. |
| *A tesztelt folyamat/funkció leírása:* | 1. A komponens betöltése<br>2. Az űrlap elemeinek megjelenítése. |
| *A tesztelés előfeltételei:* | mockolt felhasználó létrehozása |
| *A tesztelés dátuma és időpontja:* | 2025.12.07. |
| *A tesztadatok típusa:* | Űrlap |
| *A teszt-eset elvárt eredménye:* | Helyesen megjelenik a bejelentkezési űrlap mezői, valamint a Bejelentkezési gomb. |
| *A tesztelés eredménye:* | Megfelelt |

### T02:

| Mező | Tartalom |
|------|----------|
| *A teszt-eset leírás és célja:* | Ellenőrizzük, hogy sikeres bejelentkezés esetén az alkalmazás a **Főoldalra** navigál. |
| *A tesztelt folyamat/funkció leírása:* |1. A komponens betöltése<br>2. Az email és jelszó mezők kitöltése.<br>3. Bejelentkezés gomb megnyomása<br>4. **signInUser** mockolt API meghívódik<br>5. Betöltődik a /home oldal |
| *A tesztelés előfeltételei:* | mockolt felhasználó létrehozása. |
| *A tesztelés dátuma és időpontja:* | 2025.12.07. |
| *A tesztadatok típusa:* | email: test@example.com<br>jelszó: password123 |
| *A teszt-eset elvárt eredménye:* | A főoldal sikeresen megjelenik. |
| *A tesztelés eredménye:* | Megfelelt |

### T03:

| Mező | Tartalom |
|------|----------|
| *A teszt-eset leírás és célja:* | Ellenőrizzük, hogy sikertelen bejelentkezés esetén megjelenik a hibaüzenet, valamint nem történik navigáció. |
| *A tesztelt folyamat/funkció leírása:* |1. A komponens betöltése<br>2. Az email és jelszó mezők kitöltése.<br>3. Bejelentkezés gomb megnyomása<br>4. **signInUser** mockolt API meghívódik<br>5. Megjelenik a hibaüzenet<br>6. Nem történik meg a navigáció |
| *A tesztelés előfeltételei:* | mockolt felhasználó létrehozása. |
| *A tesztelés dátuma és időpontja:* | 2025.12.07. |
| *A tesztadatok típusa:* | email: test@example.com<br>jelszó: wrongpassword |
| *A teszt-eset elvárt eredménye:* | Megjeleink az "Invalid credentials" hibaüzenet, a navigáció nem történik meg. |
| *A tesztelés eredménye:* | Megfelelt |

---

## Tesztelést elvégezte

| Mező | Tartalom |
|------|----------|
| *Név:* | Mester Dominik  |
| *Dátum:* | 2025.12.07. |