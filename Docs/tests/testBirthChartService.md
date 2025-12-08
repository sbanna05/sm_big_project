# Tesztelési jegyzőkönyv

### T01:

| Mező | Tartalom |
|------|----------|
| **A teszt-eset leírás és célja:** | Ellenőrizzük, hogy a **birthChartService** calculateBirthChart funkciója helyesen számítja ki a születési chart adatokat ismert dátum és idő alapján. |
| **A tesztelt folyamat/funkció leírása:** | 1. A calculateBirthChart függvény meghívása dátummal és idővel<br>2. A csillagjegy (starsign) kiszámítása<br>3. A Hold jegy (moonsign) kiszámítása<br>4. Az aszcendens (ascendent) kiszámítása<br>5. Az eredmény objektum visszaadása |
| **A tesztelés előfeltételei:** | - |
| **A tesztelés dátuma és időpontja:** | 2025.12.07. |
| **A tesztadatok típusa:** | - dátum: 2000-01-01<br>- idő: 12:00 |
| **A teszt-eset elvárt eredménye:** | Az eredmény objektum tartalmazza a helyes starsign, moonsign és ascendent mezőket. |
| **A tesztelés eredménye:** | Megfelelt |


### T02:

| Mező | Tartalom |
|------|----------|
| **A teszt-eset leírás és célja:** | Ellenőrizzük, hogy a **birthChartService** calculateBirthChart funkciója helyesen kezeli a csillagjegyek határeseteit (jegyváltás napja). |
| **A tesztelt folyamat/funkció leírása:** | 1. A calculateBirthChart függvény meghívása a Kos jegy kezdő dátumával (március 21)<br>2. A csillagjegy helyes azonosítása<br>3. Az eredmény visszaadása |
| **A tesztelés előfeltételei:** | - |
| **A tesztelés dátuma és időpontja:** | 2025.12.07. |
| **A tesztadatok típusa:** | - dátum: 2000-03-21<br>- idő: 12:00 |
| **A teszt-eset elvárt eredménye:** | A starsign értéke *"Aries"* |
| **A tesztelés eredménye:** | Megfelelt |

---

## Tesztelést elvégezte

| Mező | Tartalom |
|------|----------|
| **Név:** | Mester Dominik |
| **Dátum:** | 2025.12.07. |