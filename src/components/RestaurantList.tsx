import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import MarkerDetails from "./MarkerDetails";

const InitList = ({
    setRestaurantSelected,
}: {
    setRestaurantSelected: Function;
}) => {
    const [restaurantList, setRestaurantList] = useState<any>([]);

    const [isListItemClicked, setIsListItemClicked] = useState(false);

    const handleListItemClick = (restaurant: any) => {
        console.log(restaurant);
        setRestaurantSelected(restaurant);
    };

    // use getRestaurantList method when the List first renders
    useEffect(() => {
        const fetchData = async () => {
            const restaurants = await getAllRestaurants();
            setRestaurantList(restaurants);
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul id="restaurantList">
                {restaurantList.map(
                    (restaurant: {
                        id: React.Key | null | undefined;
                        latitude: any;
                        longitude: any;
                        name: string | undefined;
                        website: string | undefined;
                    }) => (
                        <li
                            key={restaurant.id}
                            onClick={() => handleListItemClick(restaurant)}
                        >
                            {restaurant.name}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default InitList;
