import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RestaurantHours } from "../components/RestaurantHours";

describe("RestaurantHours", () => {
    test("should render day as Monday: Closed", () => {
        const restaurant = {
            openingHours: [{ day: "Monday", hours: "11 AM to 3 PM" }],
        };

        const { getByText } = render(
            <RestaurantHours restaurant={restaurant} />,
        );

        expect(getByText("Monday: 11 AM to 3 PM")).toBeInTheDocument();
    });

    test("should render empty", () => {
        const restaurant = {
            openingHours: [{}],
        };

        const { getByText } = render(
            <RestaurantHours restaurant={restaurant} />,
        );

        expect(getByText("N/A")).toBeInTheDocument();
    });

    test("should render the correct number of list items", () => {
        const restaurant = { noHours: [] };
        const { container } = render(
            <RestaurantHours restaurant={restaurant} />,
        );
        const listItems = container.querySelectorAll("li");
        expect(listItems.length).toBe(0);
    });
});
