# ParkD

A ParkD egy olyan alkalmazás, amely segít számunkra szabad parkolóhelyet találni egy parkolóházban, illetve lehetővé teszi annak lefoglalását is, így biztosítva azt, hogy mindig legyen parkolóhelyünk, és hogy azt hatékonyan, időpazarlás nélkül meg tudjuk találni.

A publikált oldal linkje: [ParkD](https://getparkedd.netlify.app)

## Funkciók:

### 1. Főoldal
- Carousel, ami végigmegy a parkolóházakon. A képükre kattintva megnyílik egy Modal egy térképpel, ami segíségével láthatjuk, hogy hol található a ház, és akár útvonalat is tervezhetünk hozzá.
- Sidebar, amely minden oldalon jelen van. Segítségével könnyen navigálhatjuk az oldalt. A Sidebar ad otthont a keresőmezőnek, aminek hála könnyen megtalálhatjuk a keresett parkolóházunkat annak helye alapján.

### 2. Sidebar
- A fent említetten túl a Sidebar-ban található a Be- és Kijelentkezés, illetve -ha még nincs fiókunk- a regisztráció. A regisztrálás egyik lépése az email cím megerősítése visszaigazolólevél segítségével.
- Ha már be vagyunk jelentkezve, a Sidebar-ból tudunk a saját profilunkra navigálni.

### 3. Saját Profil
- Itt találhatjuk az információkat saját magunkról
- Tudjuk módosítani adatainkat, mint például felhasználónevünket és beállíthatjuk, hogy van-e lehetőségünk mozgáskorlátozott parkolóhely foglalására
- Ezen a felületen át tudjuk fiókunkat törölni, amely több megerősítő lépésből áll.
- A "Foglalásaim" fül alatt találhatjuk a jelenleg aktív foglalásainkat: Hol foglaltunk, az mely szinten van, és milyen sorszámmal rendelkezik a parkolóhely, illetve meddig foglaltuk.

### 4. Parkolóházak
- A parkolóházak szintekre vannak bontva. Minden szinten adott mennyiségű parkolóhely található, amelyek egy felülnézetes rácsban vannak elrendezve, ami visszatükrözi az elhelyezkedésüket a valóságban, gyakorlatilag egy térképként szolgál.
- 3+1 féle ikon van:
  1. Zöld autó: Ez egy el nem foglalt, szabad parkolóhely. Rákattintva lefoglalhatjuk magunknak 1, 2 órára vagy 30 percre.
  2. Piros autó: Ez egy lefoglalt parkolóhely. Rákattintva láthatjuk, hogy ki által lett lefoglalva.
  3. Kék autó: Mozgássérült parkolóhely, csak akkor foglalhatjuk le, ha profilunkban be van állítva, hogy mozgássérültek vagyunk.
  4. Semmi: Az utat reprezentálja.

### 5. Admin Felület
- Vannak Admin fiókok, akik a profilukon keresztül elérhetik az Admin panelt. Itt kitudnak nevezni mást is adminnak email cím alapján, tölthetnek fel új parkolóházakat.
- Parkolóház feltöltéséhez szükséges:
  1. Neve
  2. Szintek száma, sor és oszlop mennyiséggel
  3. A parkolóház címe
  4. A térképen való elhelyezkedése, amely a térképnek hála könnyen megadható
  5. Egy kép a parkolóházról, amely majd a Carousel-ben megjelenik a főoldalon
- Miután feltöltöttek egy Parkolóházat, az adminoknak lehetőségük nyílik azok elrendezését megadni. Átnavigálva a parkolóházra, megadhatják hogy melyik rácspont micsoda a parkolóházon belül.

   
