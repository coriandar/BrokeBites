import React from "react";
import { getCurrentDayString } from "@/util/dateFunctions";
import { getCurrentDayHour } from "@/util/dateFunctions";
import { getOccupancyInfo } from "./getOccupancyInfo";

export const RestaurantOccupancy = ({ restaurant }) => {
    const occupancyArray = restaurant?.popularTimesHistogram;
    const currentDay = getCurrentDayString();
    const currentHour = getCurrentDayHour();

    const occupancy = getOccupancyInfo(occupancyArray, currentDay, currentHour);

    const convertOccupancy = () => {
        if (occupancy <= 45) {
            return "Not busy";
        } else if (45 < occupancy && occupancy <= 60) {
            return "Moderately busy";
        } else if (60 < occupancy && occupancy <= 75) {
            return "Busy";
        } else {
            return "Very busy";
        }
    };

    return (
        <div>
            <p>
                <p>{`Service Time: ${
                    occupancy ? convertOccupancy() : "Not Available"
                }`}</p>
            </p>
        </div>
    );
};
