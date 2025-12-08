# Tesztelési jegyzőkönyv

### T01:

| Mező | Tartalom |
|------|----------|
| **A teszt-eset leírás és célja:** | Ellenőrizzük, hogy a **Register** oldal helyesen megjeleníti a regisztrációs űrlapot. |
| **A tesztelt folyamat/funkció leírása:** | 1. Komponens renderelése<br>2. Az űrlap elemek megjelenítése |
| **A tesztelés előfeltételei:** | mockolt **UserAuth** |
| **A tesztelés dátuma és időpontja:** | 2025.12.07. |
| **A tesztadatok típusa:** | Űrlap |
| **A teszt-eset elvárt eredménye:** | Megjelenik az Email mező, a Név mező, a Jelszó mező és a Regisztráció gomb |
| **A tesztelés eredménye:** | Megfelelt |

### T02:

| Mező | Tartalom |
|------|----------|
| **A teszt-eset leírás és célja:** | Ellenőrizzük, hogy sikeres regisztráció esetén a felhasználó a bejelentkezési oldalra navigál. |
| **A tesztelt folyamat/funkció leírása:** | 1. Komponens renderelése<br>2. Email mező kitöltése<br>3. Név mező kitöltése<br>4. Jelszó mező kitöltése<br>5. Regisztráció gomb megnyomása<br>6. **signUpNewUser** mockolt API meghívódik<br>7. Sikeres válasz esetén navigálás /login oldalra |
| **A tesztelés előfeltételei:** | mockolt **UserAuth** |
| **A tesztelés dátuma és időpontja:** | 2025.12.07. |
| **A tesztadatok típusa:** | email: test@example.com<br>név: Test User<br>jelszó: password123 |
| **A teszt-eset elvárt eredménye:** | A **signUpNewUser** meghívódik a megfelelő adatokkal (test@example.com, password123, Test User), a navigáció a /login oldalra történik |
| **A tesztelés eredménye:** | Megfelelt |

### T03:

| Mező | Tartalom |
|------|----------|
| **A teszt-eset leírás és célja:** | Ellenőrizzük, hogy sikertelen regisztráció esetén megjelenik a hibaüzenet és nem történik navigáció. |
| **A tesztelt folyamat/funkció leírása:** | 1. Komponens renderelése<br>2. Email mező kitöltése<br>3. Név mező kitöltése<br>4. Jelszó mező kitöltése<br>5. Regisztráció gomb megnyomása<br>6. **signUpNewUser** mockolt API meghívódik<br>7. Sikertelen válasz esetén hibaüzenet megjelenítése<br>8. Nem történik navigáció |
| **A tesztelés előfeltételei:** | mockolt **UserAuth**|
| **A tesztelés dátuma és időpontja:** | 2025.12.07. |
| **A tesztadatok típusa:** | email: test@example.com<br>név: Test User<br>jelszó: password123 |
| **A teszt-eset elvárt eredménye:** | Megjelenik a "Registration failed" hibaüzenet, valamint navigáció nem történik meg |
| **A tesztelés eredménye:** | Megfelelt |

---

## Tesztelést elvégezte

| Mező | Tartalom |
|------|----------|
| *Név:* | Stancz Anna Boglára |
| *Dátum:* | 2025.12.07. |