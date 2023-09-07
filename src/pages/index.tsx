import Image from "next/image";
import InitMap from "../components/Map";
import InitList from "../components/RestaurantList";
import { Inter } from "next/font/google";
import { Auth } from "../components/Auth";
import MarkerDetails from "../components/MarkerDetails";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [restaurantSelected, setRestaurantSelected] = useState<any>(null);

    return (
        <main>
            <div>
                <Auth />
                <InitMap setRestaurantSelected={setRestaurantSelected} />
                <InitList setRestaurantSelected={setRestaurantSelected} />
                <MarkerDetails selected={restaurantSelected} />
            </div>
        </main>
    );
}
