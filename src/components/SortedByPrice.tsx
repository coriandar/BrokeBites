import React from "react";
import { fillingFactor } from "./RestaurantCard";

//sort restaurants by filling factor enum value (light -> dessert -> filling)
export const sortRestaurantsByFillingFactor = (restaurants: any) => {
    return restaurants.sort((a: any, b: any) => {
        const factorA = fillingFactor[a.fillingFactor];
        const factorB = fillingFactor[b.fillingFactor];

        if (factorA < factorB) {
            return -1;
        }
        if (factorA > factorB) {
            return 1;
        }
        return 0;
    });
};
