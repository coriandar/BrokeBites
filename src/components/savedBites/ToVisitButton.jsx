import React, { useEffect, useState } from "react";
import {
    doc,
    getDoc,
    setDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function ToVisitButton({ selectedRestaurant }) {
    const firestore = getFirestore();
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    const [isToVisit, setIsToVisit] = useState(false);

    // Update isToVisit when selectedRestaurant changes
    useEffect(() => {
        if (currentUserId && selectedRestaurant) {
            const userDocRef = doc(firestore, "userDB", currentUserId);

            getDoc(userDocRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const toVisits = data?.toVisit || [];

                    // Check if the selectedRestaurant ID exists in the To Visit array
                    const isCurrentlyToVisit = toVisits.includes(
                        selectedRestaurant.id
                    );

                    setIsToVisit(isCurrentlyToVisit);
                }
            });
        }
    }, [currentUserId, selectedRestaurant]);

    const addToVisit = async () => {
        const userDocRef = doc(firestore, "userDB", currentUserId);

        try {
            // Use arrayUnion to add the restaurant to the array
            await setDoc(
                userDocRef,
                { toVisit: arrayUnion(selectedRestaurant.id) },
                { merge: true }
            );

            console.log(selectedRestaurant, " added to To Visit");
            setIsToVisit(true);
        } catch (error) {
            console.error("Error adding to To Visit:", error);
            // Handle the error as needed
        }
    };

    const removeToVisit = async () => {
        const userDocRef = doc(firestore, "userDB", currentUserId);

        try {
            // Use arrayUnion to add the restaurant to the array
            await setDoc(
                userDocRef,
                { toVisit: arrayRemove(selectedRestaurant.id) },
                { merge: true }
            );

            console.log(selectedRestaurant, " removed from To Visit");
            setIsToVisit(false);
        } catch (error) {
            console.error("Error removing from To Visit:", error);
            // Handle the error as needed
        }
    };

    return (
        <button
            className="font-light text-sm"
            onClick={isToVisit ? removeToVisit : addToVisit}
        >
            {isToVisit ? "Remove To-Visit" : "To-Visit"}
        </button>
    );
}

export default ToVisitButton;
