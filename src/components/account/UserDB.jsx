import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseApp";
import { getAuth } from "firebase/auth";

export function CheckUserDB() {
    // Get the current user from Firebase Authentication
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if the user is not null before accessing its properties
    if (user) {
        // If the user exists, proceed with Firestore operations
        const userRef = doc(db, "userDB", user.uid);

        getDoc(userRef).then((userSnapshot) => {
            if (!userSnapshot.exists()) {
                // If the user document doesn't exist, add them to the userDB
                try {
                    setDoc(userRef, {
                        displayName: user.displayName,
                        email: user.email,
                        favorite: [], // Initialize with an empty array
                    });
                } catch (error) {
                    console.error("Error adding user to userDB:", error);
                    // Handle the error as needed
                }
            }
        });
    } else {
        // Handle the case where the user is null or not signed in
        console.log("User is not signed in.");
    }
}
