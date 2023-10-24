import "@testing-library/jest-dom";
import { getOccupancyInfo } from "../components/getOccupancyInfo";

describe("RestaurantOccupancy", () => {
    test("should get Mondays occupancyPercent at 20:00", () => {
        const keyDay = "Mo";
        const keyHour = 20;
        const restaurant = {
            popularTimesHistogram: {
                Su: [
                    { hour: 4, occupancyPercent: 2 },
                    { hour: 5, occupancyPercent: 6 },
                    { hour: 6, occupancyPercent: 7 },
                    { hour: 7, occupancyPercent: 16 },
                    { hour: 8, occupancyPercent: 31 },
                ],
                Mo: [
                    { hour: 17, occupancyPercent: 39 },
                    { hour: 18, occupancyPercent: 42 },
                    { hour: 19, occupancyPercent: 36 },
                    { hour: 20, occupancyPercent: 29 },
                    { hour: 21, occupancyPercent: 22 },
                    { hour: 22, occupancyPercent: 19 },
                ],
            },
        };

        const occupancyMap = restaurant?.popularTimesHistogram;
        const result = getOccupancyInfo(occupancyMap, keyDay, keyHour);
        expect(result).toBe(29);
    });

    test("should handle case where not found", () => {
        const keyDay = "Mo";
        const keyHour = 20;
        const restaurant = {
            popularTimesHistogram: {
                Mo: [{ hour: 17, occupancyPercent: 39 }],
            },
        };

        const occupancyMap = restaurant?.popularTimesHistogram;
        const result = getOccupancyInfo(occupancyMap, keyDay, keyHour);
        expect(result).toBe(null);
    });

    test("should handle case where no histogram", () => {
        const keyDay = "Mo";
        const keyHour = 20;
        const restaurant = {
            pizza: {},
        };

        const occupancyMap = restaurant?.popularTimesHistogram;
        const result = getOccupancyInfo(occupancyMap, keyDay, keyHour);
        expect(result).toBe(null);
    });

    test("should return 0%", () => {
        const keyDay = "Monday";
        const keyHour = 17;
        const restaurant = {
            popularTimesHistogram: {
                Mo: [{ hour: 17, occupancyPercent: 0 }],
            },
        };

        const occupancyMap = restaurant?.popularTimesHistogram;
        const result = getOccupancyInfo(occupancyMap, keyDay, keyHour);
        expect(result).toBe(0);
    });
});
