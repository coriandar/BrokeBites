import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Details from "./MarkerDetails";

const libraries = ["places"];
const mapApiKey = process.env.NEXT_PUBLIC_FB_API_KEY;

// Set Map size
const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};

//Set Map Styles (specifically, turn off points of interest)
const mapStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
];

//Function for rendering map
const InitMap = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: mapApiKey,
        libraries: libraries as any,
    });

    //create setRestaurantList method
    const [restaurantList, setRestaurantList] = useState<any>([]);

    const handleMarkerClick = (restaurant) => {
        console.log(restaurant);
        Details(restaurant);
    };

    //create getRestaurantList method
    const getRestaurantList = async () => {
        //Try to connect to the DB then brng the data over to the app
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

    // use getRestaurantList method when the map first renders
    useEffect(() => {
        getRestaurantList();
    }, []);

    //displays loading or loading error for map
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    //Returns GoogleMap centered on AUT with restaurants highlighted by a marker
    return (
        <GoogleMap
            zoom={17}
            center={{ lat: -36.8537761039407, lng: 174.7658246985396 }}
            mapContainerStyle={mapContainerStyle}
            options={{ styles: mapStyles }}
        >
            {restaurantList.map(
                (restaurant: {
                    id: React.Key | null | undefined;
                    latitude: any;
                    longitude: any;
                    name: string | undefined;
                    website: string | undefined;
                }) => (
                    <Marker
                        key={restaurant.id}
                        position={{
                            lat: restaurant.latitude,
                            lng: restaurant.longitude,
                        }}
                        title={restaurant.name} // Display the restaurant name on marker hover
                        onClick={() => handleMarkerClick(restaurant)}
                    />
                )
            )}
        </GoogleMap>
    );
};

export default InitMap;
