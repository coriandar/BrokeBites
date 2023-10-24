export const getOccupancyInfo = (occupancyMap, key, hour) => {
    if (!occupancyMap) return null;

    const dayKey = key.slice(0, 2); // cut to first 2 letters
    const percent = occupancyMap[dayKey]?.find(
        (entry) => entry?.hour === hour,
    )?.occupancyPercent;

    if (percent >= 0) return percent;
    else return null;
};
