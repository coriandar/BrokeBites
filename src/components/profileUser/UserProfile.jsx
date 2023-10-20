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
    const router = useRouter();
    const { uid } = router.query;
    const [userProfile, setUserProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [masterFavorites, setMasterFavorites] = useState([]);
    const [activeDashboard, setActiveDashboard] = useState("favourite");
    const [mapTheme, setMapTheme] = useState("light");

    useEffect(() => {
        const fetchProfile = async () => {
            setUserProfile(await fetchUser(uid));
        };

        const fetchProfileFavorites = async () => {
            const restaurants = await fetchFavouritesList(uid);
            setFavorites(restaurants);
            setMasterFavorites(restaurants);
        };

        const fetchProfileReviews = async () => {
            const reviewCollection = await fetchUserReviews(uid);
            setUserReviews(reviewCollection);
        };

        if (uid) {
            fetchProfile();
            fetchProfileFavorites();
            fetchProfileReviews();
        }
    }, [uid]);

    return (
        <div className="m-8">
            {userProfile ? (
                <div className="w-screen sm:h-[300px] md:h-[600px] lg:h-[800px]">
                    <div className="flex items-center justify-center">
                        <Avatar
                            maxW={"w-[50px]"}
                            photoURL={userProfile.photoURL}
                        />
                        <h2 className="text-xl font-bold">
                            {userProfile.displayName}'s Profile
                        </h2>

                        <FollowButton otherUser={uid} />
                    </div>
                    <div className="flex">
                        <div className="w-3/4 sm:h-[300px] md:h-[600px] lg:h-[800px]">
                            <Dashboard
                                restaurantList={favorites}
                                setRestaurantList={setFavorites}
                                restaurantMasterList={masterFavorites}
                                activeDashboard={activeDashboard}
                                mapTheme={mapTheme}
                                setMapTheme={setMapTheme}
                            />
                        </div>
                        <div className="m-4 w-1/4 sm:h-[300px] md:h-[600px] lg:h-[800px]">
                            <h2 className="text-xl font-bold">Review List</h2>
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
