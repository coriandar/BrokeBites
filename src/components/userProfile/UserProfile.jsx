// UserProfile.js
import { useState, useEffect } from "react";
import { db } from "../firebase/FirebaseApp";
import { doc, getDoc } from "firebase/firestore";
import { fetchSavedBitesList } from "../savedBites/SavedBitesList";

export default function UserProfile({ uid }) {
    const [userProfile, setUserProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [reviews, setReviews] = useState([]);

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

        const fetchUserReviews = async () => {
            try {
                // Query reviews collection for reviews created by the user with a specific UID
                const reviewsQuery = query(
                    collection(db, "restaurantDB", "reviews"),
                    where("userId", "==", uid)
                );

                const querySnapshot = await getDocs(reviewsQuery);
                const userReviews = querySnapshot.docs.map((doc) => doc.data());
                setReviews(userReviews);
            } catch (error) {
                console.error("Error fetching user's reviews:", error);
            }
        };

        // Call fetchUserProfile() and fetchFavorites() only if uid is defined
        if (uid) {
            fetchUserProfile();
            fetchFavorites();
            fetchUserReviews();
        }
    }, [uid]);

    return (
        <div>
            {console.log("userProfile: " + JSON.stringify(userProfile))}
            {userProfile ? (
                <div>
                    <h1>{userProfile.displayName}'s Profile</h1> <br />
                    <div id="Favourites">
                        <h2>Favorite List</h2>
                        <ul>
                            {favorites.map((favorite) => (
                                <li key={favorite.id}>{favorite.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div id="Reviews">
                        <h2>User Reviews</h2>
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.id}>{review.reviewText}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
}
