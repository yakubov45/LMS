import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC34lWnq7zQQcGnqe9A7clMwuKxy4SHDh4",
    authDomain: "techstore-0343.firebaseapp.com",
    projectId: "techstore-0343",
    storageBucket: "techstore-0343.firebasestorage.app",
    messagingSenderId: "1070568101585",
    appId: "1:1070568101585:web:c645a69c6f6d6e13d457f0",
    measurementId: "G-65EZF2E76Z"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
