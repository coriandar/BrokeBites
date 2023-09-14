import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const FavouriteList = () => {
    const firestore = getFirestore();
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    const [favourites, setFavourites] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);

    useEffect(() => {
        if (currentUserId) {
            // Create a reference to the user's document in Firestore
            const userDocRef = doc(firestore, "userDB", currentUserId);

            // Fetch the user's data
            getDoc(userDocRef)
                .then((userDocSnapshot) => {
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        const favouriteRestaurantIds = userData.favourite || [];

                        // Create an array to store restaurant data
                        const restaurantPromises = favouriteRestaurantIds.map(
                            (restaurantId) => {
                                // Create a reference to the restaurant document in Firestore
                                const restaurantDocRef = doc(
                                    firestore,
                                    "restaurantDB",
                                    restaurantId
                                );

                                // Fetch the restaurant data
                                return getDoc(restaurantDocRef)
                                    .then((restaurantDocSnapshot) => {
                                        if (restaurantDocSnapshot.exists()) {
                                            return restaurantDocSnapshot.data();
                                        }
                                        return null;
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "Error fetching restaurant data:",
                                            error
                                        );
                                        return null;
                                    });
                            }
                        );

                        // Wait for all restaurant data to be fetched
                        Promise.all(restaurantPromises)
                            .then((restaurantDataList) => {
                                setRestaurantData(
                                    restaurantDataList.filter(Boolean)
                                ); // Filter out null values
                            })
                            .catch((error) => {
                                console.error(
                                    "Error fetching restaurant data:",
                                    error
                                );
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [currentUserId]);

    return (
        <div>
            <h2>Your Favourites</h2>
            <ul>
                {restaurantData.map((restaurant, index) => (
                    <li key={index}>{restaurant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FavouriteList;
