import React from "react";

const InitList = ({
    restaurantList,
    setRestaurantSelected,
}: {
    restaurantList: any[];
    setRestaurantSelected: Function;
}) => {
    const handleListItemClick = (restaurant: any) => {
        console.log(restaurant);
        setRestaurantSelected(restaurant);
    };

    return (
        <div>
            <ul id="restaurantList">
                {restaurantList.map((restaurant) => (
                    <li
                        key={restaurant.id}
                        onClick={() => handleListItemClick(restaurant)}
                    >
                        {restaurant.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InitList;
