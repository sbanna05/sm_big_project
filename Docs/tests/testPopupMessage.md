# Tesztelési jegyzőkönyv

### T01:

| Mező | Tartalom |
|------|----------|
| *A teszt-eset leírás és célja:* | Ellenőrizzük, hogy a **PopupMessage** komponens helyesen megjeleníti az adott üzenetet. |
| *A tesztelt folyamat/funkció leírása:* | 1. A komponens betöltése<br>2. Üzenet megjelenítése.<br>3. A komponens látható állapotban van. |
| *A tesztelés előfeltételei:* | mockolt **ScratchCard** komponens. |
| *A tesztelés dátuma és időpontja:* | 2025.12.07. |
| *A tesztadatok típusa:* | message: "Test Message" |
| *A teszt-eset elvárt eredménye:* | Helyesen megjelenik a *"Test Message"* szöveg. |
| *A tesztelés eredménye:* | Megfelelt |

### T02:

| Mező | Tartalom |
|------|----------|
| *A teszt-eset leírás és célja:* | Ellenőrizzük, hogy a **PopupMessage** komponens gombja meghívja az **onClose** callback függvényt. |
| *A tesztelt folyamat/funkció leírása:* | 1. A komponens betöltése<br>2. Bezárás gomb megkeresése.<br>3. A gomb megnyomása.<br>4.  **onClose** callback meghívása. |
| *A tesztelés előfeltételei:* | mockolt **ScratchCard** komponens. |
| *A tesztelés dátuma és időpontja:* | 2025.12.07. |
| *A tesztadatok típusa:* | message: "Test Message"<br>gomb: "x" |
| *A teszt-eset elvárt eredménye:* | A gomb megnyomásakor az **onClose** callback meghívódik. |
| *A tesztelés eredménye:* | Megfelelt |

### T03:

| Mező | Tartalom |
|------|----------|
| *A teszt-eset leírás és célja:* | Ellenőrizzük, hogy a **PopupMessage** komponens eltűnik a felületről, ha megnyomjuk a bezárás gombot. |
| *A tesztelt folyamat/funkció leírása:* | 1. A komponens betöltése<br>2. Üzenet megjelenítése.<br>3. A bezárás gomb megnyomása.<br>4. Az üzenet eltűnik. |
| *A tesztelés előfeltételei:* | mockolt **ScratchCard** komponens. |
| *A tesztelés dátuma és időpontja:* | 2025.12.07. |
| *A tesztadatok típusa:* | message: "Test Message" |
| *A teszt-eset elvárt eredménye:* | A gomb megnyomásakor az üzenet eltűnik. |
| *A tesztelés eredménye:* | Megfelelt |
---

## Tesztelést elvégezte

| Mező | Tartalom |
|------|----------|
| *Név:* | Somogyi Boglárka |
| *Dátum:* | 2025.12.07. |