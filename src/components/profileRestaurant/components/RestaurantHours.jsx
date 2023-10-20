import React from "react";

export const RestaurantHours = ({ restaurant }) => {
    const getDayInfo = (openingHours) => {
        const day = openingHours?.day;
        const hours = openingHours?.hours;
        if (day && hours) return `${day}: ${hours}`;
        else return "N/A";
    };

    const openHourArray = restaurant?.openingHours;

    return (
        <div className="mb-4">
            Opening hours
            <ul>
                {openHourArray?.map((entry) => (
                    <li key={`${entry.day}x`}>{getDayInfo(entry)}</li>
                ))}
            </ul>
        </div>
    );
};
