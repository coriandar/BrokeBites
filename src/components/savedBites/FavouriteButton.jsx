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
    const [isFavourite, setIsFavourite] = useState(false);

    console.log(selectedRestaurant.id);

    // Update isFavourite when selectedRestaurant changes
    useEffect(() => {
        if (currentUserId && selectedRestaurant) {
            console.log(isFavourite);
            const userDocRef = doc(firestore, "userDB", currentUserId);

            getDoc(userDocRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const favourites = data?.favourite || [];

                    // Check if the selectedRestaurant ID exists in the favourite array
                    const isCurrentlyFavourite = favourites.includes(
                        selectedRestaurant.id
                    );

                    setIsFavourite(isCurrentlyFavourite);
                    console.log("isCurrentlyFavourite: ", isCurrentlyFavourite);
                }
            });
        }
        console.log(isFavourite);
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
            setIsFavourite(true);
            console.log(isFavourite);
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
            setIsFavourite(false);
            console.log(isFavourite);
        } catch (error) {
            console.error("Error removing from favorites:", error);
            // Handle the error as needed
        }
    };

    return (
        <button
            className="font-light text-sm"
            onClick={isFavourite ? removeFavourite : addFavourite}
        >
            {isFavourite ? "Remove favourite" : "Favourite"}
        </button>
    );
}

export default FavouriteButton;
