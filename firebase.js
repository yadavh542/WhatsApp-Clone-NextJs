// Import the functions you need from the SDKs you need

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmKKLxIit2n1hblRUj6o7myg6h0aw-Zxc",
  authDomain: "whatsapp-by-hemant.firebaseapp.com",
  projectId: "whatsapp-by-hemant",
  storageBucket: "whatsapp-by-hemant.appspot.com",
  messagingSenderId: "847061055256",
  appId: "1:847061055256:web:8a084f0218d7ded0d5106d"
};

// Initialize Firebase
const firebaseApp = !getApps().length 
        ? initializeApp(firebaseConfig)
        : getApp();

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();


export {db, auth, provider};