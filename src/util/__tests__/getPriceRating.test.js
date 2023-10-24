const { getPriceRating } = require("../logic/db_formatData.logic");

describe("getPriceRating", () => {
    test("should return rand number (1-5) if price is null ", () => {
        const doc = { price: null };
        const result = getPriceRating(doc);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(5);
    });

    test("should return rand number (1-5) if price is > 5 ", () => {
        const doc = { price: "$$$$$$" };
        const result = getPriceRating(doc);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(5);
    });

    test("should return price if between (1-5)", () => {
        const doc = { price: "$" };
        const result = getPriceRating(doc);
        expect(result).toBe(1);
    });

    test("should return price if between (1-5)", () => {
        const doc = { price: "$$$$$" };
        const result = getPriceRating(doc);
        expect(result).toBe(5);
    });
});
