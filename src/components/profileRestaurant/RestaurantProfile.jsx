import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchRestaurant } from "@/database/firebase/firestore/restaurantDB";
import { fetchRestaurantReviews } from "@/database/firebase/firestore/reviewDB";
import Map from "../map/components/Map";
import ReviewContainer from "../review/ReviewContainer";
import ReviewCardRestaurant from "../review/ReviewCardRestaurant";
import defaultCenter from "../__shared__/util/defaultCenter";
import { MarkerF } from "@react-google-maps/api";
import UserLocMarker from "../map/components/UserLocMarker";
import FavouriteButton from "../savedBites/FavouriteButton";
import ToVisitButton from "../savedBites/ToVisitButton";
import { MenuButton } from "../restaurant/components/MenuButton";
import { OrderButton } from "../restaurant/components/OrderButton";
import { ShareContainer } from "../restaurant/components/ShareContainer";
import GetDirections from "../restaurant/components/GetDirections";
import CenterToUserButton from "../map/components/CenterButton";
import Layer from "../__shared__/layout/Layer";

export default function RestaurantProfile() {
    const router = useRouter();
    const { pid } = router.query; // restaurant_id (placeId)
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [mapTheme, setMapTheme] = useState("light");
    const mapZoom = 17;
    const [center, setCenter] = useState(defaultCenter);
    const [userGeo, setUserGeo] = useState(defaultCenter);
    const [userLocation, setUserLocation] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setRestaurant(await fetchRestaurant(pid));
        };

        const fetchReviews = async () => {
            setReviews(await fetchRestaurantReviews(pid));
        };

        if (pid) {
            fetchProfile();
            fetchReviews();
            console.log("Fetching from restaurant profile");
        }
    }, [pid]);

    useEffect(() => {
        // Update the center when the restaurant state changes
        if (restaurant) {
            setCenter({
                lat: restaurant.latitude,
                lng: restaurant.longitude,
            });
            console.log("Fetching from restaurant profile");
        }
    }, [restaurant]);

    return (
        <div className="m-8">
            <div className=" w-screen sm:h-[300px] md:h-[600px] lg:h-[800px]">
                <div className="flex items-center justify-center">
                    <h2 className="text-xl font-bold">
                        {restaurant
                            ? `${restaurant?.name}'s Profile`
                            : "Loading..."}
                    </h2>
                    <FavouriteButton selectedRestaurant={restaurant} />
                    <ToVisitButton selectedRestaurant={restaurant} />
                </div>
                <div className="flex">
                    <div className="m-4 w-1/4 sm:h-[300px] md:h-[600px] lg:h-[800px]">
                        <h2 className="text-xl font-bold">
                            Restaurant Details
                        </h2>
                        <MenuButton selected={restaurant} />
                        <OrderButton selected={restaurant} />
                        <GetDirections
                            selected={restaurant}
                            userGeo={userGeo}
                        />
                        <h3 className="m-4">Address: {restaurant?.address}</h3>
                        <h3>Filling Factor: {restaurant?.fillingFactor}</h3>
                        <h3>Price rating: {restaurant?.priceRating}</h3>
                        <h3>Star rating: {restaurant?.starRating}</h3>
                        <h3>Cusine: {restaurant?.cuisine}</h3>
                        <h3>Dietary: {restaurant?.dietary}</h3>
                        <h3>Phone: {restaurant?.contactNumber}</h3>
                        <ShareContainer selected={restaurant} />
                    </div>
                    <div className="relative w-1/2 sm:h-[300px] md:h-[600px] lg:h-[800px]">
                        <Map
                            center={center}
                            mapZoom={mapZoom}
                            mapTheme={mapTheme}
                            setMapTheme={setMapTheme}
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
                            <UserLocMarker
                                userGeo={userGeo}
                                userLocation={userLocation}
                            />
                        </Map>
                        <Layer position={"bottom-48 right-2"}>
                            <CenterToUserButton
                                setCenter={setCenter}
                                userLocation={userLocation}
                                userGeo={userGeo}
                                setUserGeo={setUserGeo}
                            />
                        </Layer>
                    </div>
                    <div className="m-4 w-1/4 sm:h-[300px] md:h-[600px] lg:h-[800px]">
                        <h2 className="text-xl font-bold">Review List</h2>
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
