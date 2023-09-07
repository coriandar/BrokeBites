import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { getAllRestaurants } from "./firebase/FirebaseApp";
import { db } from "./firebase/FirebaseApp";
import { getDocs, collection } from "firebase/firestore";
import MarkerDetails from "./MarkerDetails";

const libraries = ["places"];
const mapApiKey = process.env.NEXT_PUBLIC_FB_API_KEY;

// Set Map size
const mapContainerStyle = {
    width: "80vw",
    height: "80vh",
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

    const [restaurantSelected, setRestaurantSelected] = useState<any>([]);
    const [isMarkerClicked, setIsMarkerClicked] = useState(false);

    const handleMarkerClick = (restaurant: any) => {
        console.log(restaurant);
        setIsMarkerClicked(true);
        setRestaurantSelected(restaurant);
    };

    //create getRestaurantList method

    // use getRestaurantList method when the map first renders
    useEffect(() => {
        const fetchData = async () => {
            const restaurants = await getAllRestaurants();
            setRestaurantList(restaurants);
        };

        fetchData();
    }, []);

    //displays loading or loading error for map
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    //Returns GoogleMap centered on AUT with restaurants highlighted by a marker
    return (
        <div id="map">
            <GoogleMap
                zoom={17}
                // need set this to change, update based on selection
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
            {isMarkerClicked && <MarkerDetails selected={restaurantSelected} />}
        </div>
    );
};

export default InitMap;
