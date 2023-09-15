import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseApp";
import { getAuth } from "firebase/auth";

export async function CheckUserDB() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        console.log("User is signed in.");
        // User is signed in, proceed with Firestore operations

        const userRef = doc(db, "userDB", user.uid);

        try {
            console.log("Before Firestore operation");
            const userSnapshot = await getDoc(userRef);
            console.log("After Firestore operation");

            if (!userSnapshot.exists()) {
                // If the user document doesn't exist, add them to the userDB
                await setDoc(userRef, {
                    displayName: user.displayName,
                    email: user.email,
                    favourite: [], // Initialise favourite, and toVisit with empty array
                    toVisit: [],
                });
                console.log("User added to userDB successfully.");
            }
        } catch (error) {
            console.error("Error adding user to userDB:", error);
            // Handle the error as needed
        }
    } else {
        console.log("User is not signed in.");
    }
}
