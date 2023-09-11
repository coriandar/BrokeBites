import React, { useState, useEffect } from "react";
import CuisineFilter from "./CuisineFilter";
import setSelectedCuisine from "./CuisineFilter";
import { getAllRestaurants } from "./firebase/FirebaseApp";
import firebase from "firebase/compat/app";

const Restaurant = ({ restaurants }) => {
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
    const [selectedCuisine, setSelectedCuisine] = useState(null);

    useEffect(() => {
        if (selectedCuisine) {
            const filtered = restaurants.filter(
                (restaurant) => restaurant.cuisine === selectedCuisine
            );
            setFilteredRestaurants(filtered);
        } else {
            setFilteredRestaurants(restaurants);
        }
    }, [selectedCuisine, restaurants]);

    return (
        <div>
            <h2>Restaurant List</h2>
            {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id}>
                    <h3>{restaurant.name}</h3>
                    <p>Cuisine: {restaurant.cuisine}</p>
                    {/* Display other restaurant details */}
                </div>
            ))}
        </div>
    );
};

function App() {
    const [restaurants, setRestaurants] = useState([]);

    // Fetch data from Firebase or your preferred data source here

    const db = firebase.firestore();
    const foodsCollection = db.collection("restaurants");

    const fetchData = async () => {
        try {
            const snapshot = await foodsCollection.get();
            const foodsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return foodsData;
        } catch (error) {
            console.error("Error fetching data from Firebase:", error);
            return [];
        }
    };

    const handleFilterChange = (cuisine) => {
        setSelectedCuisine(cuisine);
    };

    return (
        <div>
            <h1>My Restaurant App</h1>
            <CuisineFilter onFilterChange={handleFilterChange} />
            <RestaurantList restaurants={restaurants} />
        </div>
    );
}

export default Restaurant;
