import React from "react";
import { getCurrentDayString } from "@/util/dateFunctions";
import { getCurrentDayHour } from "@/util/dateFunctions";
import { getOccupancyInfo } from "./getOccupancyInfo";

export const RestaurantOccupancy = ({ restaurant }) => {
    const occupancyArray = restaurant?.popularTimesHistogram;
    const currentDay = getCurrentDayString();
    const currentHour = getCurrentDayHour();

    const occupancy = getOccupancyInfo(occupancyArray, currentDay, currentHour);

    return (
        <div>
            {occupancy ? (
                <p>{`Current Occupancy: ${occupancy}%`}</p>
            ) : (
                <p>Current Occupancy: Not available</p>
            )}
        </div>
    );
};
