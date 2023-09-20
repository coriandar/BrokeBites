// UserProfile.js
import { useState, useEffect } from "react";
import { db } from "../firebase/FirebaseApp";
import { doc, getDoc } from "firebase/firestore";
import { fetchSavedBitesList } from "../savedBites/SavedBitesList";
import FollowButton from "./FollowButton";

export default function UserProfile({ uid }) {
    const [userProfile, setUserProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userDocRef = doc(db, "userDB", uid); // Use uid to fetch the user document
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setUserProfile(userData);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        const fetchFavorites = async () => {
            try {
                // Fetch favorites based on uid
                const favoriteList = await fetchSavedBitesList(
                    uid,
                    "favourite"
                );
                setFavorites(favoriteList);
            } catch (error) {
                console.error("Error fetching user's favorite list:", error);
            }
        };

        // Call fetchUserProfile() and fetchFavorites() only if uid is defined
        if (uid) {
            fetchUserProfile();
            fetchFavorites();
        }
    }, [uid]);

    return (
        <div>
            {userProfile ? (
                <div>
                    <h1>{userProfile.displayName}'s Profile</h1> <br />
                    <h2>Favorite List</h2>
                    <ul>
                        {favorites.map((favorite) => (
                            <li key={favorite.id}>{favorite.name}</li>
                        ))}
                    </ul>{" "}
                    <br />
                    <FollowButton otherUser={uid} />
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
}
