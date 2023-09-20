// UserProfile.js
import { useState, useEffect } from "react";
import { db } from "../firebase/FirebaseApp";
import { doc, getDoc } from "firebase/firestore";
import FollowButton from "./FollowButton";
import Dashboard from "../Dashboard";
import {
    fetchUserSavedList,
    fetchRestaurantData,
} from "../savedBites/SavedBitesList";

export default function UserProfile({ uid }) {
    const [userProfile, setUserProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [masterFavorites, setMasterFavorites] = useState([]);
    const [activeDashboard, setActiveDashboard] = useState("favourite");

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
            const currentUserId = uid;
            const listName = "favourite";

            if (!currentUserId) return [];

            try {
                const listRestaurantIds = await fetchUserSavedList(
                    currentUserId,
                    listName
                );

                const restaurantPromises =
                    listRestaurantIds.map(fetchRestaurantData);

                const restaurantDataList = await Promise.all(
                    restaurantPromises
                );

                setFavorites(restaurantDataList);
                setMasterFavorites(restaurantDataList);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
                throw error;
            }
        };

        // Call fetchUserProfile() and fetchFavorites() only if uid is defined
        if (uid) {
            fetchUserProfile();
            fetchFavorites();
        }
    }, [uid]);

    return (
        <div className="m-8">
            {userProfile ? (
                <div className="lg:h-[900px] md:h-[600px] sm:h-[300px]">
                    <h2 className="font-bold flex justify-center items-center text-xl">
                        {userProfile.displayName}'s Profile
                    </h2>
                    <Dashboard
                        restaurantList={favorites}
                        setRestaurantList={setFavorites}
                        restaurantMasterList={masterFavorites}
                        activeDashboard={activeDashboard}
                    />
                    {/* <FollowButton otherUser={uid} /> */}
                </div>
            ) : (
                <p>User is private or does not exist...</p>
            )}
        </div>
    );
}
