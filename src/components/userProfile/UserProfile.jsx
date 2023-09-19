import { useState, useEffect } from "react";
import { db } from "../firebase/FirebaseApp";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default function UserProfile({ user }) {
    const [userProfile, setUserProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userDocRef = doc(db, "userDB", user);
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
                const favoritesRef = collection(
                    db,
                    "userDB",
                    user,
                    "favorites"
                );
                const favoritesSnapshot = await getDocs(favoritesRef);

                const userFavorites = favoritesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setFavorites(userFavorites);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        if (user) {
            fetchUserProfile();
            fetchFavorites();
        }
    }, [user]);

    return (
        <div>
            {console.log("userProfile: " + userProfile)}
            {userProfile ? (
                <div>
                    <h1>{userProfile.displayName}'s Profile</h1>
                    <h2>Favorite List</h2>
                    <ul>
                        {favorites.map((favorite) => (
                            <li key={favorite.id}>{favorite.name}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
}
