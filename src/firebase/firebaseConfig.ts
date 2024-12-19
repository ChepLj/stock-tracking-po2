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
  apiKey: "AIzaSyAKMO_XIHMmbHoQYGNcpyVJDHQSlQmwaRg",
  authDomain: "btdbf-equipment-manager.firebaseapp.com",
  projectId: "btdbf-equipment-manager",
  storageBucket: "btdbf-equipment-manager.appspot.com",
  messagingSenderId: "165677631800",
  appId: "1:165677631800:web:94db349dfe35fe69ffd9cd",
  measurementId: "G-637C6WDGFG",
  databaseURL:'https://btdbf-equipment-manager-default-rtdb.asia-southeast1.firebasedatabase.app' 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const providerGG = new GoogleAuthProvider()
const analytics = getAnalytics(app);
 const storage = getStorage(app);
 const database = getDatabase(app);
export { auth, providerGG, storage, database}