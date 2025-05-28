import { initializeApp } from "firebase/app";

//funkce na login
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//funkce pro databazi
import { getFirestore } from "firebase/firestore";

//funkce pro storage
import { getStorage } from "firebase/storage";

// API KEYS
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

//firebase init
const app = initializeApp(firebaseConfig);

//login var
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//var pro databazi
export const db = getFirestore(app);

//var pro storage
export const storage = getStorage(app);
