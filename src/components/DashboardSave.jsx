import React, { useState, useEffect } from "react";
import {
    getAllRestaurants,
    getFilteredRestaurants,
    getFilteredPriceRating,
} from "./firebase/FirebaseApp";
import InitMap from "./map/Map";
import InitList from "./restaurant/RestaurantList";
import MarkerDetails from "./map/MarkerDetails";
import FilterSelector from "./filter/FilterSelector";
import { fetchSavedBitesList } from "./savedBites/SavedBitesList";

export default function Dashboard() {
    const [restaurantMasterList, setRestaurantMasterList] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantSelected, setRestaurantSelected] = useState(null);
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("search");

    const [center, setCenter] = useState({
        lat: -36.8537761039407,
        lng: 174.7658246985396,
    });
    const [mapZoom, setMapZoom] = useState(17);

    useEffect(() => {
        const fetchData = async () => {
            // const restaurants = await getAllRestaurants();
            const restaurants = await fetchSavedBitesList("favourite");
            setRestaurantMasterList(restaurants);
            setRestaurantList(restaurants);
        };

        fetchData();
    }, []);

    const handleDeselect = () => {
        setRestaurantSelected(null);
    };

    return (
        <div className="flex h-full">
            <div className="bg-slate-100 m-4 flex flex-col justify-start w-1/5">
                <FilterSelector
                    setQuery={setQuery}
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    getFilteredPriceRating={getFilteredPriceRating}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />

                <div className="overflow-y-auto no-scrollbar h-90% m-4">
                    <InitList
                        restaurantList={restaurantList}
                        setRestaurantSelected={setRestaurantSelected}
                        setCenter={setCenter}
                        setRestaurantList={setRestaurantList}
                        getFilteredRestaurants={getFilteredRestaurants}
                        restaurantMasterList={restaurantMasterList}
                        setMapZoom={setMapZoom}
                        query={query}
                        activeFilter={activeFilter}
                    />
                </div>
            </div>

            <div className="bg-slate-300 w-4/5 relative">
                <InitMap
                    restaurantList={restaurantList}
                    setRestaurantSelected={setRestaurantSelected}
                    setCenter={setCenter}
                    center={center}
                    mapZoom={mapZoom}
                    setMapZoom={setMapZoom}
                    restaurantSelected={restaurantSelected}
                />
                <div className="bg-slate-300 w-30% bg-opacity-90 absolute bottom-0 left-0 rounded-2xl p-6 m-8">
                    {restaurantSelected && (
                        <div className="relative">
                            <button
                                className="w-4 h-4 absolute right-0 top-0 text-xs"
                                onClick={handleDeselect}
                            >
                                ✖
                            </button>
                        </div>
                    )}

                    <MarkerDetails selected={restaurantSelected} />
                </div>
            </div>
        </div>
    );
}
