import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyAUcSOpXyOQ91IEYlMMNezgUi09t4XCsHs",
  authDomain: "elroy-14498.firebaseapp.com",
  projectId: "elroy-14498",
  storageBucket: "elroy-14498.firebasestorage.app",
  messagingSenderId: "869905050037",
  appId: "1:869905050037:web:d8a40d0da12f2712b151fc",
  measurementId: "G-PZFLK27NPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
