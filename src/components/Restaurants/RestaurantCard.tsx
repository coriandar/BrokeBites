import { type } from "os";
import React from "react";

//filling factor enum
enum fillingFactor {
    Light = 1,
    Dessert = 2,
    Filling = 3,
}

//restaurant interface
interface Restaurant {
    id: string;
    fillingFactor: fillingFactor;
    latitude: number;
    longitude: number;
    name: string;
    priceRating: number;
    website: string;
}

interface RestaurantCardProps {
    restaurant: Restaurant;
}

//visual component
const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => (
    <div className="restaurant-card">
        <h3>{restaurant.name}</h3>
        <h3>{restaurant.fillingFactor}</h3>
        <p>
            Website:{" "}
            <a
                href={restaurant.website}
                target="_blank"
                rel="noopener noreferrer"
            >
                {restaurant.website}
            </a>
        </p>
    </div>
);

export default RestaurantCard;
export { fillingFactor };
