import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "stream-netflix-clone.firebaseapp.com",
  projectId: "stream-netflix-clone",
  storageBucket: "stream-netflix-clone.appspot.com",
  messagingSenderId: "988214876532",
  appId: "1:988214876532:web:960fe1c99a4dd54afd7421",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore();
export const auth = getAuth();

export default app;
