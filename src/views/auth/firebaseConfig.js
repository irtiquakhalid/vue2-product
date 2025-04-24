import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider  } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_APP_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_APP_STORAGE,
  messagingSenderId: process.env.VUE_APP_FIREBASE_APP_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_APP_MEASUREID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
