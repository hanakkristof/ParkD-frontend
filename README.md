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

## Képek az oldalról:
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/3dde9de3-9b73-4569-b8d9-fac15850704e" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/5a223a21-e967-4ff8-a3ec-4904e5ac3b86" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/616c7fae-59bf-4098-89e2-e1a35cbcbc29" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/c76afe07-8eef-4589-a7f3-9435c3beddc3" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/d91bd316-7c63-4d33-a433-c020f0cd2d83" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/952c99c8-f660-4c05-9186-ba88c535bdfb" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/549b383c-853e-4853-9534-e7cba2ac420b" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/8c105a03-ba39-46c3-85a1-7a045749324b" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/71192d4b-e8bd-453f-a0aa-38341cd14df1" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/c4278023-de0d-4870-931d-7542b6eec054" />
<img width="1920" height="1080" alt="kép" src="https://github.com/user-attachments/assets/08d6a2be-2771-4777-9f5f-8feebc6b254a" />
### Mobilon:
<img width="401" height="874" alt="kép" src="https://github.com/user-attachments/assets/71f53a8f-cc5c-4f3c-acde-79db3a00c1ca" />
<img width="405" height="874" alt="kép" src="https://github.com/user-attachments/assets/f1ff30ae-8d01-447a-804f-13e721d9c06a" />
<img width="403" height="875" alt="kép" src="https://github.com/user-attachments/assets/d94b5ff4-47a5-4715-844e-0cbdb9876e48" />

### Adatbázis sémája: 
<img width="680" height="620" alt="kép" src="https://github.com/user-attachments/assets/46c06a95-83e9-4283-94cd-504ed8f29705" />

## Backend:
### Github repo linkje: [ParkDBackend](https://github.com/hanakkristof/ParkD-backend)

### Függvények:
- POST, kép feltöltése Cloudinary-ra
  ```
  app.post("/api/uploadImage", async (req,resp)=>{
    try {
        const {image} = req.body
        const uploadResponse = await cloudinary.uploader.upload(image,{folder:"parkd"})
        return resp.json({
            serverMsg:"Sikeres képfeltöltés",
            url:uploadResponse.secure_url,
            public_id:uploadResponse.public_id
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({serverMsg:"A kép feltöltése sikertelen!"})
        
    }})
  
- POST, kép törlése Cloudinary-ből
  ```
  app.post("/api/deleteImage", async (req, resp) =>{
    try {
        const {public_id} = req.body
        console.log("a megadott kép id-je: ", public_id);
        const deleteResult = await cloudinary.uploader.destroy(public_id)
        if(deleteResult.result == "ok"){
            return resp.status(200).json({serverMsg:"Sikeresen töröltük a képet!"}) 
        }
            else {
                return resp.status(404).json({serverMsg:"Nem találtuk a képet."})
            }
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({serverMsg:"A képet nem tudtuk törölni"})
    }})


## Tesztek
### [Backend teszt](https://github.com/hanakkristof/ParkD-backend/blob/master/index.test.js)
<img width="417" height="295" alt="kép" src="https://github.com/user-attachments/assets/74e404fa-a75d-44ff-91f9-f62d6c00e10c" />

