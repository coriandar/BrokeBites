import React from "react";
import { getCurrentDayString } from "@/util/dateFunctions";
import { getDayInfo } from "@/components/profileRestaurant/components/getDayInfo";

export const CurrentDayHours = ({ selected }) => {
    const openHourArray = selected?.openingHours;
    const currentDay = getCurrentDayString();

    const getHours = () => {
        if (!openHourArray) return [];
        const day = openHourArray?.filter((entry) => entry.day === currentDay); // get match
        return day.map(getDayInfo); // format match
    };

    return <h3>{getHours()}</h3>;
};
