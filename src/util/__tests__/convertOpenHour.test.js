const { convertOpenHour } = require("../logic/db_formatData.logic");

describe("convertOpenHour", () => {
    test("should correctly append converted time", () => {
        const doc = {
            menu: null,
            website: "websiteURL",
            openingHours: [{ day: "Monday", hours: "11:05 AM to 3:30 PM" }],
        };

        const result = convertOpenHour(doc);
        expect(result[0].timeOpen).toBe("11:05");
        expect(result[0].timeClose).toBe("15:30");
    });
});
