export const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // sets 24hr
    };
    return date.toLocaleString(undefined, options);
};
