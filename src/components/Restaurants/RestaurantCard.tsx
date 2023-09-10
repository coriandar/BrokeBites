import React from "react";
import styles from "./RestaurantCard.module.css";

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
    <div className={styles["restaurant-card"]}>
        <h3>{restaurant.name}</h3>
        <h3>{restaurant.fillingFactor}</h3>
        <h3>Price rating: {restaurant.priceRating}</h3>
        {restaurant.website ? ( // Check if website is not an empty string
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
        ) : (
            "No website for this restaurant"
        )}
    </div>
);

export default RestaurantCard;
export { fillingFactor };
