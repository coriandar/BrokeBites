import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBxCg3NYRGP49TAfURnknBeGHqBI9GKDT4",
    authDomain: "brokebites-2023.firebaseapp.com",
    projectId: "brokebites-2023",
    storageBucket: "brokebites-2023.appspot.com",
    messagingSenderId: "582483629923",
    appId: "1:582483629923:web:59b3eaff14f8fab4eda556",
    measurementId: "G-1YGDSLZJB9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
