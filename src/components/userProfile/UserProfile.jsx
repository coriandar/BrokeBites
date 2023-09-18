import { useState, useEffect } from "react";
import { db } from "../firebase/FirebaseApp";
import { collection, getDocs, where, query } from "firebase/firestore";

export default function Favorites({ favorites }) {
    return (
        <div>
            <h1>User's Favorite List</h1>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.id}>{favorite.name}</li>
                ))}
            </ul>
        </div>
    );
}

// Fetch the user's favorite list based on UID
export async function getServerSideProps(context) {
    const { uid } = context.params;

    try {
        const favoritesRef = collection(db, "userDB", uid, "favorites");
        const favoritesSnapshot = await getDocs(favoritesRef);

        const favorites = favoritesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return {
            props: {
                favorites,
            },
        };
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return {
            props: {
                favorites: [],
            },
        };
    }
}
