import { cuisineNames } from "@/components/filter/options/optCuisine";

module.exports = {
    getMenu: (doc) => {
        if (doc.menu) return doc.menu;
        else if (doc.website) return doc.website;
        else return null;
    },

    getPriceRating: (doc) => {
        const priceRating = doc.price ? doc.price.length : 0;
        if (priceRating >= 1 && priceRating <= 5) return priceRating;
        else return Math.floor(Math.random() * 5) + 1;
    },

    getCategoryName: (doc) => {
        if (!doc.categoryName) return "Restaurant";
        else if (doc.categoryName.includes("Cafe")) return "Cafe";
        else return "Restaurant";
    },

    getDietary: (doc) => {
        const offerings = doc.additionalInfo["Offerings"];
        const dietary = ["Vegan options", "Vegetarian options", "Halal food"];
        let dietaryReq = "None";
        if (!offerings) return dietaryReq;
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
    },

    getCuisine: (doc) => {
        const c = doc.categories;
        for (let cuisine of cuisineNames) {
            if (c.includes(cuisine)) return cuisine;
        }

        for (let d of doc.categories) {
            for (let cuisine of cuisineNames) {
                if (d.includes(cuisine)) return cuisine;
            }
        }
        return "Other";
    },

    getFillingFactor: (
        doc,
        lightCounter,
        dessertCounter,
        MAX_LIGHT,
        MAX_DESSERT,
    ) => {
        const rand = Math.floor(Math.random() * 3);
        if (lightCounter < MAX_LIGHT && rand === 0) {
            lightCounter++;
            return "Light";
        } else if (dessertCounter < MAX_DESSERT && rand === 1) {
            dessertCounter++;
            return "Dessert";
        } else return "Filling";
    },
};
