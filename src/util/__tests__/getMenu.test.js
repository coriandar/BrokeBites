const { getMenu } = require("../logic/db_formatData.logic");

describe("getMenuTest", () => {
    test("should return websiteURL if menuURL is null", () => {
        const doc = {
            menu: null,
            website: "websiteURL",
        };

        const result = getMenu(doc);
        expect(result).toBe("websiteURL");
    });

    test("should return menuURL if exists", () => {
        const doc = {
            menu: "menuURL",
            website: "websiteURL",
        };

        const result = getMenu(doc);
        expect(result).toBe("menuURL");
    });

    test("should return null if neither exists", () => {
        const doc = {
            menu: null,
            website: null,
        };

        const result = getMenu(doc);
        expect(result).toBe(null);
    });
});
