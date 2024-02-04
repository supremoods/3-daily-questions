// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCfbU0Z6izA7DLy_CinNvN_gU9Edj0ev6g",
  authDomain: "daily-questions-abfc7.firebaseapp.com",
  projectId: "daily-questions-abfc7",
  storageBucket: "daily-questions-abfc7.appspot.com",
  messagingSenderId: "766363954348",
  appId: "1:766363954348:web:1d6ba3f8fca32c39538309",
  measurementId: "G-JHF3ECNGC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }