import axios from "axios";
import { db } from "./firebaseApp"
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc, setDoc, getDocs, where } from "firebase/firestore";

import imageCompression from "browser-image-compression";
import { deleteImage } from "./cloudinaryUtils";

const apiKey = import.meta.env.VITE_IMGBB_API_KEY
const imgbburl = "https://api.imgbb.com/1/upload?key=" + apiKey

const uploadToIMGBB = async (file) => {
    const myFormData = new FormData()
    myFormData.append("image", file)
    try {
        const response = await axios.post(imgbburl, myFormData)
        const { url, delete_url } = response.data.data

        return { url, delete_url }
    } catch (error) {
        console.log("Képfeltöltési hiba: " + error);

    }
}

//új recept feltöltése: addDoc()
export const addParkoloHaz = async (parkoloHaz) => {
    try {
        let imgUrl = ""
        let deleteUrl = ""
        const compressed = await imageCompression(file, { maxWidthOrHeight: 800, useWebWorker: true })
        const result = await uploadToIMGBB(compressed)
        if (result) {
            imgUrl = result.url
            deleteUrl = result.delete_url
            const collectionref = collection(db, "parkolohazak")
            await addDoc(collectionref, { ...parkoloHaz, imgUrl: imgUrl, deleteUrl: deleteUrl, timestamp: serverTimestamp() })
        }


    } catch (error) {
        console.log("Nem sikerült hozzáadni!" + error)
    }
}

export const getSzintek = (parkoloHazId, callback) => {
  const szintekRef = collection(db, "parkolohazak", parkoloHazId, "szintek");
  const q = query(szintekRef, orderBy("szint_szama"));
  
  return onSnapshot(q, (snapshot) => {
    const szintek = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(szintek);
  });
};


export const readParkolohazak = (setCallback) => {
    const colRef = collection(db, "parkolohazak")
    const q = query(colRef, orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const result = [];
        snapshot.docs.forEach(doc => {
            result.push({
                id: doc.id,
                name: doc.data().name,
                hely: doc.data().hely,
                imgUrl: doc.data().imgUrl,
                createdAt: doc.data().createdAt,
            });
        });
        console.log("result:", result); // verify this looks right
        setCallback(result);
    });
    return unsubscribe
}





export const readParkolohaz = async (id, setCallback) => {
    const docRef = doc(db, "parkolohazak", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        setCallback(docSnap.data());
    } else {
        console.log("Nincs ilyen parkolóház!");
    }
};

//recept törlése id alapján:
export const deleteParkolohaz = async (id, deleteUrl) => {
    //await axios.get(deleteUrl)
    if (window.confirm("Biztosan szeretnéd törölni a receptet?")) {
        const docRef = doc(db, "parkolohazak", id)
        await deleteDoc(docRef)
    }
}

//szintek lekérése az adott garázsban
export const getSzintekSzama = async (parkoloId, setCallback) => {
    if (!parkoloId === undefined || parkoloId === null) {
        console.error("Hiba: Nincs parkoloId!")
        return;
    }
    try {
        const szintekRef = collection(db, "parkolohazak", String(parkoloId), "szintek")
        const snapshot = await getDocs(szintekRef)
        setCallback(snapshot.size)
    } catch (error) {
        console.error("Hiba a szintek lekérdezésekor", error.message)
    }
}



//update
export const updateParkolohaz = async (id, updatedData, file) => {
    let imgUrl = updatedData.imgUrl || ''
    let deleteUrl = updatedData.deleteUrl || ''

    try {
        if (file) {
            const compressed = await imageCompression(file, { maxWidthOrHeight: 800, useWebWorker: true })
            const result = await uploadToIMGBB(compressed)
            if (result) {
                imgUrl = result.url
                deleteUrl = result.delete_url
            }

        }
        const docRef = doc(db, 'parkolohazak', id)
        await updateDoc(docRef, { ...updatedData, imgUrl, deleteUrl, updateAt: serverTimestamp() })

    } catch (error) {
        console.log("nem sikerült a módosítás: " + error)
    }
}

//új gyűjtemény kell az avatar public_id tárolására:

export const updateAvatar = async (uid, public_id) => {
    let oldPublicId = null
    try {
        const docRef = doc(db, "avatars", uid)//egy dokumentum referencia
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
            await setDoc(docRef, { uid, public_id })
        } else {
            oldPublicId = docSnap.data().public_id
            await updateDoc(docRef, { public_id })
        } if (oldPublicId) await deleteImage(oldPublicId)


    } catch (error) {
        console.log("Avatar módosítás/törlés hiba!", error);

    }
}

export const deleteAvatar = async (uid) => {
    console.log(uid);
    let publicId = null
    try {
        const docRef = doc(db, "avatars", uid)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) return
        else {
            publicId = docSnap.data().public_id
            await deleteImage(publicId)
            await deleteDoc(docRef)//firestore:avatarsból töröl
        }
    } catch (error) {
        console.log("törlési hiba", error)
    }

}   


export const searchHely = async(text) =>{
    if (!text) return []

    const q = query(collection(db, "parkolohazak"), where("hely", ">=", text), where("hely", "<=", text + "\uf8ff"))

    const snapshot = await getDocs(q)

    return snapshot.docs.map(obj =>({id: obj.id, ...obj.data() }))
}