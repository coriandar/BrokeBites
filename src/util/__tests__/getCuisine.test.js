const { getCuisine } = require("../logic/db_FormatData.logic");

describe("getCuisine", () => {
    test("should return Japansese", () => {
        const doc = {
            categories: [
                "Pan-Asian restaurant",
                "Chicken shop",
                "Japanese restaurant",
                "Korean restaurant",
                "Sushi restaurant",
            ],
        };

        const result = getCuisine(doc);
        expect(result).toBe("Japanese");
    });

    test("should return other", () => {
        const doc = { categories: ["Pan-Asian restaurant"] };

        const result = getCuisine(doc);
        expect(result).toBe("Other");
    });

    test("should return other", () => {
        const doc = { categories: [] };

        const result = getCuisine(doc);
        expect(result).toBe("Other");
    });

    test("should return Korean", () => {
        const doc = {
            categories: ["Korean restaurant", "Japanese restaurant"],
        };

        const result = getCuisine(doc);
        expect(result).toBe("Korean");
    });
});
