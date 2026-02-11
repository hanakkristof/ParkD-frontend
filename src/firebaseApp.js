import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//saját Firebase App példány, ezzel érjük el az összes szolgáltatást
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)//ez az objektum felel a Google-s loginért
export const db = getFirestore(app)//firestore adatbázis inicializálása
