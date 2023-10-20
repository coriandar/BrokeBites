export const getDayInfo = (openingHours) => {
    const day = openingHours?.day;
    const hours = openingHours?.hours;
    if (day && hours) return `${day}: ${hours}`;
    else return "N/A";
};
