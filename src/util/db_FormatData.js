const { write } = require("./write");
const folder = "dataToClean/";
const directory = "C:/Users/eeyudot/_repos/aucklandRestaurants/" + folder;
const filePath = "../" + folder;
const fileName = "mergedData";
const nameExtra = "_filtered";
const data = require("../" + folder + fileName + nameExtra + ".json");

function exportCleaned() {
    const getCuisine = (doc) => {
        const cat = doc.categoryName;
        if (cat.includes("Chinese")) return "Chinese";
        else if (cat.includes("Filipino")) return "Filipino";
        else if (cat.includes("French")) return "French";
        else if (cat.includes("Greek")) return "Greek";
        else if (cat.includes("Indian")) return "Indian";
        else if (cat.includes("Italian")) return "Italian";
        else if (cat.includes("Japanese")) return "Japanese";
        else if (cat.includes("Korean")) return "Korean";
        else if (cat.includes("Malaysian")) return "Malaysian";
        else if (cat.includes("Mediterranean")) return "Mediterranean";
        else if (cat.includes("Mexican")) return "Mexican";
        else if (cat.includes("Middle Eastern")) return "Middle Eastern";
        else if (cat.includes("Persian")) return "Persian";
        else if (cat.includes("Taiwanese")) return "Taiwanese";
        else if (cat.includes("Thai")) return "Thai";
        else if (cat.includes("Turkish")) return "Turkish";
        else if (cat.includes("Vietnamese")) return "Vietnamese";

        for (let d of doc.categories) {
            if (d.includes("Chinese")) return "Chinese";
            else if (d.includes("Filipino")) return "Filipino";
            else if (d.includes("French")) return "French";
            else if (d.includes("Greek")) return "Greek";
            else if (d.includes("Indian")) return "Indian";
            else if (d.includes("Italian")) return "Italian";
            else if (d.includes("Japanese")) return "Japanese";
            else if (d.includes("Korean")) return "Korean";
            else if (d.includes("Malaysian")) return "Malaysian";
            else if (d.includes("Mediterranean")) return "Mediterranean";
            else if (d.includes("Mexican")) return "Mexican";
            else if (d.includes("Middle Eastern")) return "Middle Eastern";
            else if (d.includes("Persian")) return "Persian";
            else if (d.includes("Taiwanese")) return "Taiwanese";
            else if (d.includes("Thai")) return "Thai";
            else if (d.includes("Turkish")) return "Turkish";
            else if (d.includes("Vietnamese")) return "Vietnamese";
            else return "Other";
        }
    };

    const getDietary = (doc) => {
        const offerings = doc.additionalInfo["Offerings"];
        let dietaryReq = "None";

        if (!offerings) return dietaryReq;

        const dietary = ["Vegan options", "Vegetarian options", "Halal food"];
        for (const diet of dietary) {
            const value = offerings.find((item) => item.hasOwnProperty(diet));
            if (value && value[diet]) {
                if (diet === "Halal food") {
                    dietaryReq = "Halal";
                    break;
                } else {
                    dietaryReq = diet.slice(0, -8).trim();
                    break;
                }
            }
        }
        return dietaryReq;
    };

    const getMenu = (doc) => {
        if (doc.menu) return doc.menu;
        else return doc.website;
    };

    const getPriceRating = (doc) => {
        if (doc.price != null && doc.price.length <= 5) return doc.price.length;
        else return Math.floor(Math.random() * 5) + 1;
    };

    let lightCounter = 0;
    let dessertCounter = 0;
    const MAX_LIGHT = 50;
    const MAX_DESSERT = 50;
    const getFillingFactor = (doc) => {
        const rand = Math.floor(Math.random() * 3);
        if (lightCounter < MAX_LIGHT && rand === 0) {
            lightCounter++;
            return "Light";
        } else if (dessertCounter < MAX_DESSERT && rand === 1) {
            dessertCounter++;
            return "Dessert";
        } else return "Filling";
    };

    const getCategoryName = (doc) => {
        if (doc.categoryName.includes("Cafe")) return "Cafe";
        else return "Restaurant";
    };

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
        write(exportPath, jsonData, filePath);
    }
}

exportCleaned();
