# Tesztelési jegyzőkönyv

### T01:

| Mező | Tartalom |
|------|----------|
| **A teszt-eset leírás és célja:** | Ellenőrizzük, hogy az **aiService** getDailyHoroscope funkciója helyesen generál horoszkópot a Google Generative AI használatával. |
| **A tesztelt folyamat/funkció leírása:** | 1. A getDailyHoroscope függvény meghívása csillagjeggyel és hangulattal<br>2. A mockolt GoogleGenerativeAI API meghívása<br>3. A generateContent függvény meghívása<br>4. A válasz szöveg visszaadása |
| **A tesztelés előfeltételei:** | mockolt **GoogleGenerativeAI** osztály<br>mockolt **generateContent** függvény |
| **A tesztelés dátuma és időpontja:** | 2025.12.07. |
| **A tesztadatok típusa:** | - csillagjegy: Leo<br>- hangulat: Happy |
| **A teszt-eset elvárt eredménye:** | A függvény visszaadja a "Your horoscope text." szöveget és a **generateContent** meghívódik |
| **A tesztelés eredménye:** | Megfelelt |


---

## Tesztelést elvégezte

| Mező | Tartalom |
|------|----------|
| **Név:** | Magyar Zsófia |
| **Dátum:** | 2025.12.07. |