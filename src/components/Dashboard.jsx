import React, { useState, useEffect } from "react";
import {
    getAllRestaurants,
    getFilteredRestaurants,
    getFilteredPriceRating,
    getFilteredFillingFactor,
    getFilteredCuisine,
    getSortedPriceRating,
} from "./firebase/FirebaseApp";
import InitMap from "./map/Map";
import InitList from "./restaurant/RestaurantList";
import MarkerDetails from "./map/MarkerDetails";
import InitPriceSlider from "./restaurant/PriceSlider";
import FillingFactorButtons from "./restaurant/FilingFactorButton";
import CuisineButtons from "./restaurant/CuisineButton";
import SortPriceButton from "./restaurant/SortByPriceButton";

export default function Dashboard() {
    const [restaurantMasterList, setRestaurantMasterList] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantSelected, setRestaurantSelected] = useState(null);

    const [center, setCenter] = useState({
        lat: -36.8537761039407,
        lng: 174.7658246985396,
    });
    const [mapZoom, setMapZoom] = useState(17);

    useEffect(() => {
        const fetchData = async () => {
            const restaurants = await getAllRestaurants();
            setRestaurantMasterList(restaurants);
            setRestaurantList(restaurants);
        };

        fetchData();
    }, []);

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
                    setMapZoom={setMapZoom}
                />
            </div>
            <div className="bg-slate-300 w-2/3 relative">
                <InitMap
                    restaurantList={restaurantList}
                    setRestaurantSelected={setRestaurantSelected}
                    setCenter={setCenter}
                    center={center}
                    mapZoom={mapZoom}
                    setMapZoom={setMapZoom}
                    restaurantSelected={restaurantSelected}
                />
                <div className="bg-slate-300 w-2/3 bg-opacity-90 absolute bottom-0 left-0">
                    <MarkerDetails selected={restaurantSelected} />
                </div>
            </div>
            <div className="filters">
                <InitPriceSlider
                    restaurantMasterList={restaurantMasterList}
                    setRestaurantList={setRestaurantList}
                    getFilteredPriceRating={getFilteredPriceRating}
                />
                <h3>Filter filling factor</h3>
                <FillingFactorButtons
                    setRestaurantList={setRestaurantList}
                    masterRestaurantList={restaurantMasterList}
                    getFilteredFillingFactor={getFilteredFillingFactor}
                />
                <h3>Filter cuisine</h3>
                <CuisineButtons
                    setRestaurantList={setRestaurantList}
                    masterRestaurantList={restaurantMasterList}
                    getFilteredCuisine={getFilteredCuisine}
                />
                <h3>Sort by price</h3>
                <SortPriceButton
                    setRestaurantList={setRestaurantList}
                    masterRestaurantList={restaurantMasterList}
                    getSortedPriceRating={getSortedPriceRating}
                />
            </div>
        </div>
    );
}
