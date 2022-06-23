// Import the functions you need from the SDKs you need

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb6Uomz7sVojJwrrEnmD4F093aMdFZiis",
  authDomain: "whatsapp-hemant-38bcd.firebaseapp.com",
  projectId: "whatsapp-hemant-38bcd",
  storageBucket: "whatsapp-hemant-38bcd.appspot.com",
  messagingSenderId: "1069685475956",
  appId: "1:1069685475956:web:c21f3070ef9a399d291f21"
};

// Initialize Firebase
const firebaseApp = !getApps().length 
        ? initializeApp(firebaseConfig)
        : getApp();

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();


export {db, auth, provider};