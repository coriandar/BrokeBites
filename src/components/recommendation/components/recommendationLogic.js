const getRand = (mergedList) => {
    return mergedList[Math.floor(Math.random() * mergedList.length)];
};

export const getParamPostCode = (mergedList) => {
    const postalCode = parseInt(getRand(mergedList)?.postalCode);
    if (!postalCode) return { lowerBound: 0, upperBound: 0 };

    if (600 <= postalCode && postalCode <= 618) {
        // west auckland
        return { lowerBound: 600, upperBound: 618 };
    } else if (620 <= postalCode && postalCode <= 632) {
        // north auckland
        return { lowerBound: 620, upperBound: 632 };
    } else if (1000 <= postalCode && postalCode <= 1144) {
        // central auckland
        return { lowerBound: 1000, upperBound: 1144 };
    } else if (2000 <= postalCode && postalCode <= 2016) {
        // east auckland
        return { lowerBound: 2000, upperBound: 2016 };
    } else if (2019 <= postalCode && postalCode <= 2105) {
        // south auckland
        return { lowerBound: 2019, upperBound: 2105 };
    } else return { lowerBound: 0, upperBound: 0 };
};

export const mergeLists = (...lists) => {
    const mergedList = [];
    for (const list of lists) mergedList.push(...list);
    const setMergedList = [...new Set(mergedList.map((item) => item.id))];
    return setMergedList;
};

export const fetchRecommendedList = (mergedList, masterList) => {
    const diet = getRand(mergedList)?.dietary;
    const cuisine = getRand(mergedList)?.cuisine;
    const { lowerBound, upperBound } = getParamPostCode(mergedList);

    const filtered = masterList
        .filter((entry) => entry?.dietary === diet)
        .filter((entry) => entry?.cuisine === cuisine)
        .filter((entry) => {
            const postCode = parseInt(entry?.postalCode);
            if (lowerBound > 0) {
                return lowerBound <= postCode && postCode <= upperBound;
            } else return true;
        });

    const filterID = mergedList
        .map((entry) => entry?.id)
        .filter((id) => id !== undefined);

    if (filterID > 0) {
        const setFiltered = filtered.filter(
            (entry) => !filterID?.includes(entry.id),
        );
        return setFiltered.slice(0, 3);
    } else return filtered.slice(0, 3);
};
