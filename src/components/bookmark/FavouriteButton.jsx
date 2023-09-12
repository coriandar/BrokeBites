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

const firestore = getFirestore();
const auth = getAuth();

function FavouriteButton({ selectedRestaurant }) {
    const currentUserId = auth.currentUser?.uid;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (currentUserId) {
            const userDocRef = doc(firestore, "userDB", currentUserId);

            getDoc(userDocRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    if (data?.favourite?.includes(selectedRestaurant.id)) {
                        setIsFavorite(true);
                    }
                }
            });
        }
    }, [currentUserId, selectedRestaurant]);

    const toggleFavorite = () => {
        if (!currentUserId) {
            // Handle the case where the user is not signed in
            return;
        }

        const userDocRef = doc(firestore, "userDB", currentUserId);

        if (isFavorite) {
            // If the restaurant is in favorites, remove it
            setDoc(
                userDocRef,
                { favourite: arrayRemove(selectedRestaurant.id) },
                { merge: true }
            );
            setIsFavorite(false);
        } else {
            // If the restaurant is not in favorites, add it
            setDoc(
                userDocRef,
                { favourite: arrayUnion(selectedRestaurant.id) },
                { merge: true }
            );
            setIsFavorite(true);
        }
    };

    return (
        <button onClick={toggleFavorite}>
            {isFavorite ? "Remove" : "Favourite"}
        </button>
    );
}

export default FavouriteButton;
