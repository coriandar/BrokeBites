const fs = require("fs");
const folder = "dataToClean/";
const directory = "C:/Users/eeyudot/_repos/BrokeBites/src/util/" + folder;
const filePath = "./" + folder;
const fileName = "mergedData";
const nameExtra = "_filtered";
const data = require("./" + folder + fileName + nameExtra + ".json");

function exportCleaned() {
    const cleaned = data.map((doc) => ({
        address: doc.address,
        postalCode: doc.postalCode,
        category: getCategoryName(doc),
        contactNumber: doc.phoneUnformatted,
        cuisine: getCuisine(doc),
        dietary: getDietary(doc),
        fillingFactor: getFillingFactor(doc),
        latitude: doc.location.lat,
        longitude: doc.location.lng,
        name: doc.title,
        id: doc.placeId,
        priceRating: getPriceRating(doc),
        starRating: doc.totalScore,
        reviewsCount: doc.reviewsCount,
        reviewsDistribution: doc.reviewsDistribution,
        website: getMenu(doc),
        order: doc.orderBy,
        openingHours: doc.openingHours,
        popularTimesHistogram: doc.popularTimesHistogram,
    }));

    const jsonData = JSON.stringify(cleaned, null, 2);
    console.log(cleaned.length);
    const exportPath = directory + fileName + "_cleaned.json";

    const runExport = false;
    if (runExport) {
        fs.writeFile(exportPath, jsonData, (err) => {
            if (err) throw err;
            console.log("JSON data has been written to", filePath);
        });
    }

    return jsonData;
}

exportCleaned();
