import React, { useState } from "react";
import {
    getAllRestaurants,
    getFilteredRestaurants,
} from "../firebase/FirebaseApp";
import InitMap from "../map/Map";
import InitList from "../restaurant/RestaurantList";
import MarkerDetails from "../map/MarkerDetails";

// Used Jamie C's Dashboard code
export default function BookmarkMap({ restaurantData }) {
    const [restaurantMasterList, setRestaurantMasterList] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantSelected, setRestaurantSelected] = useState(null);

    const [center, setCenter] = useState({
        lat: -36.8537761039407,
        lng: 174.7658246985396,
    });

    console.log("restaurantData in FavouriteList:", restaurantData);

    return (
        <div className="flex h-full">
            <div className="bg-slate-100 m-4 flex justify-center overflow-y-auto no-scrollbar w-1/3">
                <InitList
                    restaurantList={restaurantData}
                    setRestaurantSelected={setRestaurantSelected}
                    setCenter={setCenter}
                    setRestaurantList={setRestaurantList}
                    getFilteredRestaurants={getFilteredRestaurants}
                    restaurantMasterList={restaurantData}
                />
            </div>
            <div className="bg-slate-300 w-2/3 relative">
                <div style={{ height: "700px", width: "100%" }}>
                    <InitMap
                        restaurantList={restaurantData}
                        setRestaurantSelected={setRestaurantSelected}
                        setCenter={setCenter}
                        center={center}
                    />
                </div>
                <div className="bg-slate-300 w-2/3 bg-opacity-90 absolute bottom-0 left-0">
                    <MarkerDetails selected={restaurantSelected} />
                </div>
            </div>
        </div>
    );
}
