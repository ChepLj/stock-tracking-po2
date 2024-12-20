// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPK03wzNUr0f3kC6PWdpo8WWPYYedLA-U",
  authDomain: "stock-tracking-3d5f0.firebaseapp.com",
  projectId: "stock-tracking-3d5f0",
  storageBucket: "stock-tracking-3d5f0.firebasestorage.app",
  messagingSenderId: "302903306907",
  appId: "1:302903306907:web:b86049cce489b99b9f743e",
  measurementId: "G-0HZGY2TG53",
  databaseURL:'https://stock-tracking-3d5f0-default-rtdb.asia-southeast1.firebasedatabase.app/' 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const providerGG = new GoogleAuthProvider()
const analytics = getAnalytics(app);
 const storage = getStorage(app);
 const database = getDatabase(app);
export { auth, providerGG, storage, database}