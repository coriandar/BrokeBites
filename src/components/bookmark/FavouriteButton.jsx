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

function FavouriteButton({ selectedRestaurant }) {
    const firestore = getFirestore();
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    const [isFavorite, setIsFavorite] = useState(false);

    // Update isFavorite when selectedRestaurant changes
    useEffect(() => {
        if (currentUserId && selectedRestaurant) {
            const userDocRef = doc(firestore, "userDB", currentUserId);

            getDoc(userDocRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const favorites = data?.favourite || [];

                    // Check if the selectedRestaurant ID exists in the favorites array
                    const isCurrentlyFavorite = favorites.includes(
                        selectedRestaurant.id
                    );

                    setIsFavorite(isCurrentlyFavorite);
                }
            });
        }
    }, [currentUserId, selectedRestaurant]);

    const addFavourite = async () => {
        const userDocRef = doc(firestore, "userDB", currentUserId);

        try {
            // Use arrayUnion to add the restaurant to the array
            await setDoc(
                userDocRef,
                { favourite: arrayUnion(selectedRestaurant.id) },
                { merge: true }
            );

            console.log(selectedRestaurant, " added to favourite");
            setIsFavorite(true);
        } catch (error) {
            console.error("Error adding to favorites:", error);
            // Handle the error as needed
        }
    };

    const removeFavourite = async () => {
        const userDocRef = doc(firestore, "userDB", currentUserId);

        try {
            // Use arrayUnion to add the restaurant to the array
            await setDoc(
                userDocRef,
                { favourite: arrayRemove(selectedRestaurant.id) },
                { merge: true }
            );

            console.log(selectedRestaurant, " removed from favourtie");
            setIsFavorite(false);
        } catch (error) {
            console.error("Error removing from favorites:", error);
            // Handle the error as needed
        }
    };

    return (
        <button onClick={isFavorite ? removeFavourite : addFavourite}>
            {isFavorite ? "Remove" : "Favourite"}
        </button>
    );
}

export default FavouriteButton;
