const { getCategoryName } = require("../logic/db_FormatData.logic");

describe("getCategoryName", () => {
    test("should return restaurant if category is null", () => {
        const doc = { categoryName: null };
        const result = getCategoryName(doc);
        expect(result).toBe("Restaurant");
    });

    test("should return cafe if category is cafe", () => {
        const doc = { categoryName: "Cafe" };
        const result = getCategoryName(doc);
        expect(result).toBe("Cafe");
    });

    test("should return restaurant if category is not cafe", () => {
        const doc = { categoryName: "Restaurant" };
        const result = getCategoryName(doc);
        expect(result).toBe("Restaurant");
    });
});
