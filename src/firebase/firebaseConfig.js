// Import Firebase services
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXmPZkTXaiKTN1k3mYFz9yVpPUhjavbAg",
  authDomain: "rise-up-1a912.firebaseapp.com",
  databaseURL: "https://rise-up-1a912-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rise-up-1a912",
  storageBucket: "rise-up-1a912.appspot.com",
  messagingSenderId: "420527456671",
  appId: "1:420527456671:web:9d1d772ed8e56ba59b7daa",
  measurementId: "G-D9V7V2ZZSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Export functions
export { onAuthStateChanged, doc, getDoc, setDoc };

export default app;
