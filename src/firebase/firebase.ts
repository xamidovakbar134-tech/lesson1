import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAodgG1fnUAIBN97kVvp7BGzY4GmqXmE6I",
  authDomain: "g-88-82c63.firebaseapp.com",
  databaseURL: "https://g-88-82c63-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "g-88-82c63",
  storageBucket: "g-88-82c63.firebasestorage.app",
  messagingSenderId: "126246645187",
  appId: "1:126246645187:web:a612199d8c9119d740a176",
  measurementId: "G-1YCH5NBGQ3"
};

const app=initializeApp(firebaseConfig)

// Initialize Firebase
export const db =getFirestore(app);
export const auth = getAuth(app);
export const realDB= getDatabase(app)