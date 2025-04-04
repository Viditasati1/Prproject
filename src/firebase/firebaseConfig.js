// Import Firebase services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Only needed if using Realtime Database
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
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };