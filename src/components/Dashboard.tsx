import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "./firebase/FirebaseApp";
import InitMap from "./map/Map";
import InitList from "./restaurant/RestaurantList";
import MarkerDetails from "./map/MarkerDetails";

export default function Dashboard() {
    const [restaurantList, setRestaurantList] = useState<any>([]);
    const [restaurantSelected, setRestaurantSelected] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const restaurants = await getAllRestaurants();
            setRestaurantList(restaurants);
        };

        fetchData();
    }, []);

    return (
        <div className="flex mx-auto w-screen h-screen">
            <div className="h-screen overflow-y-auto no-scrollbar flex justify-center w-1/3">
                <InitList
                    restaurantList={restaurantList}
                    setRestaurantSelected={setRestaurantSelected}
                />
            </div>
            <div className="bg-slate-300 flex w-2/3 h-screen">
                <InitMap
                    restaurantList={restaurantList}
                    setRestaurantSelected={setRestaurantSelected}
                />
                <MarkerDetails selected={restaurantSelected} />
            </div>
        </div>
    );
}
