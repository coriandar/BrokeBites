// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxCg3NYRGP49TAfURnknBeGHqBI9GKDT4",
    authDomain: "brokebites-2023.firebaseapp.com",
    projectId: "brokebites-2023",
    storageBucket: "brokebites-2023.appspot.com",
    messagingSenderId: "582483629923",
    appId: "1:582483629923:web:59b3eaff14f8fab4eda556",
    measurementId: "G-1YGDSLZJB9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
