

import { initializeApp } from "firebase/app";

//funkce na login
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//funkce pro databazi
import{ getFirestore } from "firebase/firestore";

//funkce pro storage
import{ getStorage } from "firebase/storage";

// API KEYS
import { apiKeys } from "./apiKeys";

const firebaseConfig = {
    apiKey: apiKeys.firebaseApiKey,
    authDomain: "collabro-281e7.firebaseapp.com",
    projectId: "collabro-281e7",
    storageBucket: "collabro-281e7.firebasestorage.app",
    messagingSenderId: "513304203869",
    appId: "1:513304203869:web:d6c6e55b2c9dc0090973b4",
    measurementId: apiKeys.googleId
};

//firebase init
const app = initializeApp(firebaseConfig);

//login var
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//var pro databazi
export const db = getFirestore(app);

//var pro storage
export const storage = getStorage(app);