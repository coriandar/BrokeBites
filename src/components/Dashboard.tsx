import MarkerDetails from "../components/MarkerDetails";
import InitMap from "../components/Map";
import InitList from "../components/RestaurantList";
import { useState } from "react";

export default function Dashboard() {
    const [restaurantSelected, setRestaurantSelected] = useState<any>(null);
    return (
        <div>
            <InitMap setRestaurantSelected={setRestaurantSelected} />
            <InitList setRestaurantSelected={setRestaurantSelected} />
            <MarkerDetails selected={restaurantSelected} />
        </div>
    );
}
