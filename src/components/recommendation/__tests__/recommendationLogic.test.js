import "@testing-library/jest-dom";
import {
    mergeLists,
    getParamPostCode,
    fetchRecommendedList,
} from "../components/recommendationLogic";

describe("RecommendedRestaurants", () => {
    test("should get correct dietary and cuisine", () => {
        const restaurants = [{ dietary: "None", cuisine: "Korean" }];
        const result = fetchRecommendedList(restaurants, restaurants);
        expect(result[0].dietary).toBe("None");
        expect(result[0].cuisine).toBe("Korean");
    });

    test("should return maximum 3 results", () => {
        const restaurants = [
            { dietary: "None", cuisine: "Korean" },
            { dietary: "None", cuisine: "Korean" },
            { dietary: "None", cuisine: "Korean" },
            { dietary: "None", cuisine: "Korean" },
            { dietary: "None", cuisine: "Korean" },
        ];
        const result = fetchRecommendedList(restaurants, restaurants);
        expect(result.length).toBe(3);
    });

    test("should get correct dietary and cuisine and post", () => {
        const restaurants = [
            { dietary: "None", cuisine: "Korean", postalCode: "0000" },
        ];
        const result = fetchRecommendedList(restaurants, restaurants);
        expect(result[0].dietary).toBe("None");
        expect(result[0].cuisine).toBe("Korean");
        expect(result[0].postalCode).toBe("0000");
    });

    test("should return empty on no match", () => {
        const restaurants = [];
        const result = fetchRecommendedList(restaurants, restaurants);
        expect(result.length).toBe(0);
    });

    test("should return { lowerBound: 1000, upperBound: 1144 }", () => {
        const restaurants = [{ postalCode: "1010" }];
        const result = getParamPostCode(restaurants);
        expect(result).toEqual({ lowerBound: 1000, upperBound: 1144 });
    });

    test("should get correct number of uniques", () => {
        const list1 = [{ id: "01" }];
        const list2 = [{ id: "01" }];
        const list3 = [{ id: "03" }];
        const result = mergeLists(list1, list2, list3);
        expect(result.length).toBe(2);
    });

    test("should filter out items present in the mergedList", () => {
        const mergedList = [{ id: "01", dietary: "None" }];
        const masterList = [
            { id: "01", dietary: "None" },
            { id: "02", dietary: "None" },
        ];
        const result = fetchRecommendedList(mergedList, masterList);
        expect(result.length).toBe(1);
        expect(result[0].dietary).toBe("None");
    });
});
