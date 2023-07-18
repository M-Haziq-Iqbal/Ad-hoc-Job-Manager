// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAti5eqrrz9K3VHFF0LC3Thf5W7O6EsqRs",
  authDomain: "fir-auth-d1b0f.firebaseapp.com",
  projectId: "fir-auth-d1b0f",
  storageBucket: "fir-auth-d1b0f.appspot.com",
  messagingSenderId: "96906183262",
  appId: "1:96906183262:web:7049d64d0e6bc1ae8beacf"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)