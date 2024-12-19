// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { API_KEY, APP_ID, DATABASE_URL } from "./variable";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigAccount = {
  apiKey: API_KEY,
  authDomain: "accountmanager-7de97.firebaseapp.com",
  databaseURL: DATABASE_URL,
  projectId: "accountmanager-7de97",
  storageBucket: "accountmanager-7de97.appspot.com",
  messagingSenderId: "82985948365",
  appId: APP_ID,
  measurementId: "G-E3RL17F0MQ",
};

// Initialize Firebase
const appAccount = initializeApp(firebaseConfigAccount, "SECONDARY");
 const databaseAccount = getDatabase(appAccount);
export { databaseAccount };

