import "@testing-library/jest-dom";
import { checkDuplicate } from "../reviewLimitLogic";

describe("Check for duplicate reviews", () => {
    test("Should contain a duplicate review", () => {
        const reviews = {
            review1: [{ userID: 1, restaurantID: 10 }],
            review2: [{ userID: 1, restaurantID: 20 }],
        };

        // In this test, we expect a duplicate review with the same userID and restaurantID
        const result = checkDuplicate(reviews, 1, 10);
        expect(result).toBe(true); // Expecting a duplicate in this case
    });

    test("Should not contain a duplicate review", () => {
        const reviews = {
            review2: [{ userID: 2, restaurantID: 20 }],
            review3: [{ userID: 3, restaurantID: 30 }],
        };

        // In this test, we expect no duplicate reviews with the same userID and restaurantID
        const result = checkDuplicate(reviews, 1, 10);
        expect(result).toBe(false); // Not expecting a duplicate in this case
    });
    test("Should handle null reviews", () => {
        const reviews = null;

        // In this test, we're passing null reviews, so there should be no duplicates.
        const result = checkDuplicate(reviews, 1, 10);
        expect(result).toBe(false); // Not expecting a duplicate when reviews are null
    });
});
