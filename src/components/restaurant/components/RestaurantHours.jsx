import React from "react";
import { getCurrentDayString } from "@/util/dateFunctions";
import { getDayInfo } from "./getDayInfo";

export const RestaurantHours = ({ restaurant }) => {
    const openHourArray = restaurant?.openingHours;
    const currentDay = getCurrentDayString();

    return (
        <div className="mb-4">
            Opening hours
            <ul>
                {openHourArray?.map((entry) => (
                    <li
                        key={`${entry.day}x`}
                        className={`${
                            entry?.day === currentDay &&
                            "bg-slate-300 font-bold"
                        }`}
                    >
                        {getDayInfo(entry)}
                    </li>
                ))}
            </ul>
        </div>
    );
};
