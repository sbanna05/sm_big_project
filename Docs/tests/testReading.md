# Tesztelési jegyzőkönyv

### T01:

| Mező | Tartalom |
|------|----------|
| **A teszt-eset leírás és célja:** | Ellenőrizzük, hogy a **Reading** oldal helyesen megjeleníti a címet és a kezdeti horoszkóp olvasást. |
| **A tesztelt folyamat/funkció leírása:** | 1. A komponens betöltése<br>2. A cím megjelenítése: "Cosmic Weather Update"<br>3. A kezdeti horoszkóp megjelenítése: ARIES |
| **A tesztelés előfeltételei:** | - |
| **A tesztelés dátuma és időpontja:** | 2025.12.07. |
| **A tesztadatok típusa:** | Szöveg |
| **A teszt-eset elvárt eredménye:** | Megjelenik a "Cosmic Weather Update" cím és az ARIES horoszkóp |
| **A tesztelés eredménye:** | Megfelelt |

### T02:

| Mező | Tartalom |
|------|----------|
| **A teszt-eset leírás és célja:** | Ellenőrizzük, hogy a **Reading** oldalon a "Next ▶" gomb megnyomásával a következő horoszkópra navigálunk. |
| **A tesztelt folyamat/funkció leírása:** | 1. Komponens renderelése<br>2. Kezdeti horoszkóp ellenőrzése<br>3. "Next ▶" gomb megnyomása<br>4. A következő horoszkóp megjelenítése. |
| **A tesztelés előfeltételei:** | - |
| **A tesztelés dátuma és időpontja:** | 2025.12.07. |
| **A tesztadatok típusa:** | Navigáció: **ARIES → TAURUS** |
| **A teszt-eset elvárt eredménye:** | A "Next ▶" gomb megnyomása után az ARIES horoszkópról a TAURUS horoszkópra vált a megjelenítés |
| **A tesztelés eredménye:** | Megfelelt |

### T03:

| Mező | Tartalom |
|------|----------|
| **A teszt-eset leírás és célja:** | Ellenőrizzük, hogy a **Reading** oldalon az "◀ Previous" gomb megnyomásával az előző horoszkópra navigálunk. |
| **A tesztelt folyamat/funkció leírása:** | 1. Komponens renderelése<br>2. Kezdeti horoszkóp ellenőrzése <br>3. "◀ Previous" gomb megnyomása<br>4. Az előző horoszkóp megjelenítése. |
| **A tesztelés előfeltételei:** | - |
| **A tesztelés dátuma és időpontja:** | 2025.12.07. |
| **A tesztadatok típusa:** | Navigáció: **ARIES → PISCES** |
| **A teszt-eset elvárt eredménye:** | Az "◀ Previous" gomb megnyomása után az ARIES horoszkópról a PISCES horoszkópra vált a megjelenítés |
| **A tesztelés eredménye:** | Megfelelt |

---

## Tesztelést elvégezte

| Mező | Tartalom |
|------|----------|
| *Név:* | Somogyi Boglárka |
| *Dátum:* | 2025.12.07. |