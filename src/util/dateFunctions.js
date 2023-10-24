export const formatTimestamp = (timestamp) => {
    const date = timestamp?.toDate();
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // sets 24hr
    };
    return date?.toLocaleString("en-NZ", options);
};

export const getCurrentDayString = () => {
    const date = new Date();
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
};

export const getCurrentDayHour = () => {
    const date = new Date();
    return date.getHours();
};
