import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { apiKeys } from "./apiKeys";

const firebaseConfig = {
  apiKey: apiKeys.firebaseApiKey,
  authDomain: "applifting-3771e.firebaseapp.com",
  projectId: "applifting-3771e",
  storageBucket: "applifting-3771e.firebasestorage.app",
  messagingSenderId: "69381622379",
  appId: "1:69381622379:web:0587b2c0382cfbfdfebf2e",
  measurementId: apiKeys.googleId,
};

// Firebase init
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
