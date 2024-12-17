// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const API_KEY = "AIzaSyB9XaQI7p5Y0AcjpLDqa8nW2E_CGlrbi2U";
const AUTH_DOMAIN = "vibesnap-service.firebaseapp.com";
const PROJECT_ID = "vibesnap-service";
const STORAGE_BUCKET = "vibesnap-service.firebasestorage.app";
const MESSAGING_SENDER_ID = "4303700179";
const APP_ID = "1:4303700179:web:5e85a233de9f83274ed426";
const MEASUREMENT_ID = "G-FL52FYGSLN";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
