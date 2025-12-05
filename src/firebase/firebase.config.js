// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// তোমার Firebase প্রজেক্টের কনফিগ (তুমি যেটা দিয়েছ, একদম ঠিক)
const firebaseConfig = {
  apiKey: "AIzaSyD5fArVcUnMmJ4iuc4LU7U3mio-JxZAyJ4",
  authDomain: "ass-10-264a3.firebaseapp.com",
  projectId: "ass-10-264a3",
  storageBucket: "ass-10-264a3.firebasestorage.app",
  messagingSenderId: "799511913254",
  appId: "1:799511913254:web:a3e64bfe20e55e1d0f57e7"
};

// Firebase ইনিশিয়ালাইজ করো
const app = initializeApp(firebaseConfig);

// Auth অবজেক্ট এক্সপোর্ট করো (এটা ছাড়া লগইন কাজ করবে না)
export const auth = getAuth(app);

export default app; // যদি পরে লাগে