import { useState, useEffect } from "react";
import ReviewContainer from "../review/ReviewContainer";
import FollowButton from "./FollowButton";
import Dashboard from "../dashboard/Dashboard";
import {
    fetchUser,
    fetchFavouritesList,
} from "@/database/firebase/firestore/userDB";
import { fetchUserReviews } from "@/database/firebase/firestore/reviewDB";
import Avatar from "../account/Avatar";
import ReviewCardProfile from "../review/ReviewCardProfile";
import { useRouter } from "next/router";

export default function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [masterFavorites, setMasterFavorites] = useState([]);
    const [activeDashboard, setActiveDashboard] = useState("favourite");
    const [mapTheme, setMapTheme] = useState("light");
    const router = useRouter();
    const { uid } = router.query;
    const selectedUserID = uid;

    useEffect(() => {
        if (selectedUserID) {
            fetchProfile();
            fetchProfileFavorites();
            fetchProfileReviews();
        }
    }, [selectedUserID]);

    const fetchProfile = async () => {
        setUserProfile(await fetchUser(selectedUserID));
    };

    const fetchProfileFavorites = async () => {
        const restaurants = await fetchFavouritesList(selectedUserID);
        setFavorites(restaurants);
        setMasterFavorites(restaurants);
    };

    const fetchProfileReviews = async () => {
        const reviewCollection = await fetchUserReviews(selectedUserID);
        setUserReviews(reviewCollection);
    };

    return (
        <div className="m-8">
            {userProfile ? (
                <div className="lg:h-[800px] md:h-[600px] sm:h-[300px]">
                    <div className="flex justify-center items-center">
                        <Avatar
                            maxW={"w-[50px]"}
                            photoURL={userProfile.photoURL}
                        />
                        <h2 className="font-bold text-xl">
                            {userProfile.displayName}'s Profile
                        </h2>

                        <FollowButton otherUser={selectedUserID} />
                    </div>
                    <div className="flex">
                        <div className="w-3/4 lg:h-[800px] md:h-[600px] sm:h-[300px]">
                            <Dashboard
                                restaurantList={favorites}
                                setRestaurantList={setFavorites}
                                restaurantMasterList={masterFavorites}
                                activeDashboard={activeDashboard}
                                mapTheme={mapTheme}
                                setMapTheme={setMapTheme}
                            />
                        </div>
                        <div className="w-1/4 m-4 lg:h-[800px] md:h-[600px] sm:h-[300px]">
                            <h2 className="font-bold text-xl">Review List</h2>
                            <ReviewContainer
                                reviewsData={userReviews}
                                reviewCardType={ReviewCardProfile}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <p>User is private or does not exist...</p>
            )}
        </div>
    );
}
