import React, { useEffect, useState } from "react";
import {
    doc,
    getDoc,
    setDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore, DocumentReference } from "firebase/firestore";

const firestore = getFirestore();
const auth = getAuth();

function FavouriteButton({ selectedRestaurant }) {
    const currentUserId = auth.currentUser?.uid;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (currentUserId && selectedRestaurant) {
            const userDocRef = doc(firestore, "userDB", currentUserId);

            getDoc(userDocRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const favorites = data?.favourite || [];

                    // Check if the selectedRestaurant reference exists in the favorites array
                    const isCurrentlyFavorite = favorites.some(
                        (favoriteRef) =>
                            favoriteRef instanceof DocumentReference &&
                            favoriteRef.path === selectedRestaurant.ref.path // Compare reference paths
                    );

                    setIsFavorite(isCurrentlyFavorite);
                    console.log("Restaurant added");
                }
            });
        }
    }, [currentUserId, selectedRestaurant]);

    const toggleFavorite = () => {
        if (!currentUserId || !selectedRestaurant) {
            // Handle the case where the user is not signed in or selectedRestaurant is undefined
            return;
        }

        const userDocRef = doc(firestore, "userDB", currentUserId);

        if (isFavorite) {
            // If the restaurant reference is in favorites, remove it
            setDoc(
                userDocRef,
                {
                    favourite: arrayRemove(selectedRestaurant.ref), // Remove the reference
                },
                { merge: true }
            );
            setIsFavorite(false);
            console.log("Restaurant removed");
        } else {
            // If the restaurant reference is not in favorites, add it
            setDoc(
                userDocRef,
                {
                    favourite: arrayUnion(selectedRestaurant.ref), // Add the reference
                },
                { merge: true }
            );
            setIsFavorite(true);
            console.log("Restaurant added");
        }
    };

    return (
        <button onClick={toggleFavorite}>
            {isFavorite ? "Remove" : "Favourite"}
        </button>
    );
}

export default FavouriteButton;
