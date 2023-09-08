import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapApiKey = process.env.NEXT_PUBLIC_FB_API_KEY;

const mapContainerStyle = {
    width: "80vw",
    height: "80vh",
};

const mapStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
];

const InitMap = ({
    restaurantList,
    setRestaurantSelected,
}: {
    restaurantList: any[];
    setRestaurantSelected: Function;
}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: mapApiKey,
        libraries: libraries as any,
    });

    const handleMarkerClick = (restaurant: any) => {
        console.log(restaurant);
        setRestaurantSelected(restaurant);
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div id="map">
            <GoogleMap
                zoom={17}
                center={{ lat: -36.8537761039407, lng: 174.7658246985396 }}
                mapContainerStyle={mapContainerStyle}
                options={{ styles: mapStyles }}
            >
                {restaurantList.map((restaurant) => (
                    <Marker
                        key={restaurant.id}
                        position={{
                            lat: restaurant.latitude,
                            lng: restaurant.longitude,
                        }}
                        title={restaurant.name}
                        onClick={() => handleMarkerClick(restaurant)}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default InitMap;
