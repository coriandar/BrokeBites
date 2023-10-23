const { getDietary } = require("../logic/db_formatData.logic");

describe("getDietary", () => {
    test("if all true, should return Vegan", () => {
        const doc = {
            additionalInfo: {
                Offerings: [
                    {
                        "Vegan options": true,
                        "Vegetarian options": true,
                        "Halal food": true,
                    },
                ],
            },
        };

        const result = getDietary(doc);
        expect(result).toBe("Vegan");
    });

    test("if vegan true && vege true, should return vegan", () => {
        const doc = {
            additionalInfo: {
                Offerings: [
                    {
                        "Vegan options": true,
                        "Vegetarian options": true,
                        "Halal food": false,
                    },
                ],
            },
        };

        const result = getDietary(doc);
        expect(result).toBe("Vegan");
    });

    test("if vege true, should return vege", () => {
        const doc = {
            additionalInfo: {
                Offerings: [
                    {
                        "Vegan options": false,
                        "Vegetarian options": true,
                        "Halal food": false,
                    },
                ],
            },
        };

        const result = getDietary(doc);
        expect(result).toBe("Vegetarian");
    });

    test("if halal true && vegan/vege false, should return halal", () => {
        const doc = {
            additionalInfo: {
                Offerings: [
                    {
                        "Vegan options": false,
                        "Vegetarian options": false,
                        "Halal food": true,
                    },
                ],
            },
        };

        const result = getDietary(doc);
        expect(result).toBe("Halal");
    });

    test("if no match, should return none", () => {
        const doc = {
            additionalInfo: {
                Offerings: [],
            },
        };

        const result = getDietary(doc);
        expect(result).toBe("None");
    });
});
