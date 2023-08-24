import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { db } from "../config/firebase"; // Make sure firebase is imported correctly
import { getDocs, collection } from "firebase/firestore";

const libraries = ["places"];

const InitMap = () => {
    const mapContainerStyle = {
        width: "100vw",
        height: "100vh",
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBxCg3NYRGP49TAfURnknBeGHqBI9GKDT4", // Replace with your API key
        libraries: libraries as any,
    });

    const [restaurantList, setRestaurantList] = useState<any>([]);

    const getRestaurantList = async () => {
        try {
            const restaurantCollectionRef = collection(db, "restaurantDB");
            const data = await getDocs(restaurantCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            console.log(filteredData);
            setRestaurantList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getRestaurantList();
    }, []); // This runs the function once when the component mounts

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            zoom={15}
            center={{ lat: -36.85, lng: 174.76 }}
            mapContainerStyle={mapContainerStyle}
        >
            {restaurantList.map(
                (restaurant: {
                    id: React.Key | null | undefined;
                    lat: any;
                    lng: any;
                    name: string | undefined;
                }) => (
                    <Marker
                        key={restaurant.id}
                        position={{ lat: restaurant.lat, lng: restaurant.lng }}
                        title={restaurant.name} // Display the restaurant name on marker hover
                    />
                )
            )}
        </GoogleMap>
    );
};

export default InitMap;
