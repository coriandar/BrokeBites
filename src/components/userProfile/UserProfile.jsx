// UserProfile.js
import { useState, useEffect } from "react";
import { db, getUserReviews } from "../firebase/FirebaseApp";
import { doc, getDoc } from "firebase/firestore";
import { fetchSavedBitesList } from "../savedBites/SavedBitesList";

export default function UserProfile({ uid: selectedUserID }) {
    const [userProfile, setUserProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [userReviews, setUserReviews] = useState([]);

    const formatTimestamp = (timestamp) => {
        const date = timestamp.toDate();
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // sets 24hr
        };
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userDocRef = doc(db, "userDB", selectedUserID); // Use uid to fetch the user document
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
                    selectedUserID,
                    "favourite"
                );
                setFavorites(favoriteList);
            } catch (error) {
                console.error("Error fetching user's favorite list:", error);
            }
        };

        const fetchUserReviews = async () => {
            try {
                console.log("Attempting to get reviews for", selectedUserID);
                const reviewCollection = await getUserReviews(selectedUserID);
                setUserReviews(reviewCollection);
            } catch {
                console.error("Error fetching user's review list:", error);
            }
        };

        // Call fetchUserProfile() and fetchFavorites() only if uid is defined
        if (selectedUserID) {
            fetchUserProfile();
            fetchFavorites();
            fetchUserReviews();

            //console.log("UserReviews:");
        }
    }, [selectedUserID]);

    return (
        <div>
            {/*{console.log("userProfile: " + JSON.stringify(userProfile))}*/}
            {userProfile ? (
                <div>
                    <div>
                        <h1>{userProfile.displayName}'s Profile</h1> <br />
                        <h2>Favorite List</h2>
                        <ul>
                            {favorites.map((favorite) => (
                                <li key={favorite.id}>{favorite.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>Review List</h2>
                        <ul>
                            {userReviews.map((review) => (
                                <li className="m-4 bg-slate-50 p-4 rounded-lg shadow-lg w-95%">
                                    <div className="flex justify-between items-center w-full h-8">
                                        <h3>{review.restaurantName}</h3>
                                        <p className="font-light text-xs">
                                            {formatTimestamp(review.timestamp)}
                                        </p>
                                    </div>
                                    <p>{review.reviewText}</p>
                                </li>
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
