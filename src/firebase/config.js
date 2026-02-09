// Firebase core
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Firebase services


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP_BmPbqtWZLxXePP16YJ3S26Nu7UTp9A",
  authDomain: "hackhaton-resume.firebaseapp.com",
  projectId: "hackhaton-resume",
  storageBucket: "hackhaton-resume.appspot.com",
  messagingSenderId: "1010063155603",
  appId: "1:1010063155603:web:2e02711a37486e972b4866",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);