import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchRestaurant } from "@/database/firebase/firestore/restaurantDB";
import { fetchRestaurantReviews } from "@/database/firebase/firestore/reviewDB";
import Map from "../map/components/Map";
import ReviewContainer from "../review/ReviewContainer";
import ReviewCardRestaurant from "../review/ReviewCardRestaurant";
import defaultCenter from "../__shared__/defaultCenter";
import { MarkerF } from "@react-google-maps/api";
import FavouriteButton from "../savedBites/FavouriteButton";
import ToVisitButton from "../savedBites/ToVisitButton";

export default function RestaurantProfile() {
    const router = useRouter();
    const { pid } = router.query; // restaurant_id (placeId)
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const mapTheme = "light";
    const mapZoom = 17;
    const [center, setCenter] = useState(defaultCenter);

    useEffect(() => {
        const fetchProfile = async () => {
            setRestaurant(await fetchRestaurant(pid));
            setCenter({
                lat: restaurant?.latitude,
                lng: restaurant?.longitude,
            });
        };
        const fetchReviews = async () => {
            setReviews(await fetchRestaurantReviews(pid));
        };
        if (pid) {
            fetchProfile();
            fetchReviews();
        }
    }, [pid, center, restaurant]);

    return (
        <div className="m-8">
            <div className="lg:h-[800px] md:h-[600px] sm:h-[300px]">
                <div className="flex justify-center items-center">
                    <h2 className="font-bold text-xl">
                        {restaurant
                            ? `${restaurant?.name}'s Profile`
                            : "Loading..."}
                    </h2>
                    <FavouriteButton selectedRestaurant={restaurant} />
                    <ToVisitButton selectedRestaurant={restaurant} />
                </div>
                <div className="flex">
                    <div className="w-1/4 m-4 lg:h-[800px] md:h-[600px] sm:h-[300px]">
                        <h2 className="font-bold text-xl">
                            Restaurant Details
                        </h2>
                    </div>
                    <div className="w-1/2 lg:h-[800px] md:h-[600px] sm:h-[300px]">
                        <Map
                            center={center}
                            mapZoom={mapZoom}
                            mapTheme={mapTheme}
                        >
                            <MarkerF
                                key={restaurant?.id}
                                position={{
                                    lat: restaurant?.latitude,
                                    lng: restaurant?.longitude,
                                }}
                                title={restaurant?.name}
                                icon={"/pink-dot-bite.png"}
                            />
                        </Map>
                    </div>
                    <div className="w-1/4 m-4 lg:h-[800px] md:h-[600px] sm:h-[300px]">
                        <h2 className="font-bold text-xl">Review List</h2>
                        <ReviewContainer
                            reviewsData={reviews}
                            reviewCardType={ReviewCardRestaurant}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
