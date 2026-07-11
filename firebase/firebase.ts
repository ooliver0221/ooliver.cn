import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "eric-s-web.firebaseapp.com",
  projectId: "eric-s-web",
  storageBucket: "eric-s-web.appspot.com",
  messagingSenderId: "297389906907",
  appId: "1:297389906907:web:dc27c906bd8f2eb16565fe",
  measurementId: "G-RBMSS743BT",
};

function getFirebaseOrNull() {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.warn("NEXT_PUBLIC_FIREBASE_API_KEY not set — using local images");
    return null;
  }
  try {
    const app = initializeApp(firebaseConfig);
    return { app, storage: getStorage(app) };
  } catch {
    console.warn("Firebase init failed — using local images");
    return null;
  }
}

const fb = getFirebaseOrNull();

export const app = fb?.app ?? null;
export const storage = fb?.storage ?? null;
