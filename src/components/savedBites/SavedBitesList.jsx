import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import BookmarkMap from "./SavedBitesMap";

const SavedBitesList = ({ listType }) => {
    const firestore = getFirestore();
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    const [restaurantData, setRestaurantData] = useState([]);

    useEffect(() => {
        if (currentUserId) {
            const listName = listType === "Favourite" ? "favourite" : "toVisit"; // Determine which list to fetch
            console.log(listType);

            // Create a reference to the user's document in Firestore
            const userDocRef = doc(firestore, "userDB", currentUserId);

            // Fetch the user's data
            getDoc(userDocRef)
                .then((userDocSnapshot) => {
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        const listRestaurantIds = userData[listName] || [];

                        // Create an array to store restaurant data
                        const restaurantPromises = listRestaurantIds.map(
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
    }, [currentUserId, listType]);

    return (
        <div>
            <h2>Your {listType}s</h2>
            <ul>
                <BookmarkMap restaurantData={restaurantData} />
            </ul>
        </div>
    );
};

export default SavedBitesList;
