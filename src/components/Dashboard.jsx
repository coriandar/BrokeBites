import React, { useState, useEffect } from "react";
import {
    getAllRestaurants,
    getFilteredRestaurants,
} from "./firebase/FirebaseApp";
import InitMap from "./map/Map";
import InitList from "./restaurant/RestaurantList";
import MarkerDetails from "./map/MarkerDetails";
import { CheckUserDB } from "./account/UserDB";
import { auth } from "./firebase/FirebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Dashboard() {
    const [restaurantMasterList, setRestaurantMasterList] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantSelected, setRestaurantSelected] = useState(null);

    const [center, setCenter] = useState({
        lat: -36.8537761039407,
        lng: 174.7658246985396,
    });

    useEffect(() => {
        const fetchData = async () => {
            const restaurants = await getAllRestaurants();
            setRestaurantMasterList(restaurants);
            setRestaurantList(restaurants);
        };

        fetchData();
    }, []);

    //const [user, loading] = useAuthState(auth);

    return (
        <div className="flex h-full">
            <div className="bg-slate-100 m-4 flex justify-center overflow-y-auto no-scrollbar w-1/3">
                <InitList
                    restaurantList={restaurantList}
                    setRestaurantSelected={setRestaurantSelected}
                    setCenter={setCenter}
                    setRestaurantList={setRestaurantList}
                    getFilteredRestaurants={getFilteredRestaurants}
                    restaurantMasterList={restaurantMasterList}
                />
            </div>
            <div className="bg-slate-300 w-2/3 relative">
                <InitMap
                    restaurantList={restaurantList}
                    setRestaurantSelected={setRestaurantSelected}
                    setCenter={setCenter}
                    center={center}
                />
                <div className="bg-slate-300 w-2/3 bg-opacity-90 absolute bottom-0 left-0">
                    <MarkerDetails selected={restaurantSelected} />
                </div>
            </div>
            {/*{user ? <CheckUserDB /> : <p>No user logged in</p>}*/}
        </div>
    );
}
