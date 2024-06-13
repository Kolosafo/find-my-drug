import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyDx37X3Umw3RPd7MKusvxPe8igL7PkC7_8",
  authDomain: "findmydrug-b1615.firebaseapp.com",
  projectId: "findmydrug-b1615",
  storageBucket: "findmydrug-b1615.appspot.com",
  messagingSenderId: "784381486942",
  appId: "1:784381486942:web:68d51cf7feab63132851cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// DB
export const db = getFirestore(app);
export const drugSearchCollectionRef = collection(db, "drugSearch");
export const userCollectionRef = collection(db, "user");
export const drugFoundCollectionRef = collection(db, "drugFound");

// AUTH
export const auth = getAuth(app);
