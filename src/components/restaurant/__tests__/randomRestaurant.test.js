import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RandomRestaurant from "../RandomRestaurant";

// Mock the ButtonLarge component
jest.mock("../../__shared__/ui/ButtonLarge", () => {
    return {
        __esModule: true,
        default: ({ label, action }) => (
            <button onClick={action}>{label}</button>
        ),
    };
});

describe("RandomRestaurant component", () => {
    test("should trigger the random restaurant selection on button click", () => {
        const restaurantList = [
            { id: 1, latitude: 40.7128, longitude: -74.006 },
            { id: 2, latitude: 34.0522, longitude: -118.2437 },
        ];
        const setRestaurantSelected = jest.fn();
        const setCenter = jest.fn();
        const setMapZoom = jest.fn();

        const { getByText } = render(
            <RandomRestaurant
                restaurantList={restaurantList}
                setRestaurantSelected={setRestaurantSelected}
                setCenter={setCenter}
                setMapZoom={setMapZoom}
            />,
        );

        // Click the "I'm feeling hungry" button
        fireEvent.click(getByText("I'm feeling hungry"));

        // Check that the setRestaurantSelected, setCenter, and setMapZoom functions were called
        expect(setRestaurantSelected).toHaveBeenCalledTimes(1);
        expect(setCenter).toHaveBeenCalledTimes(1);
        expect(setMapZoom).toHaveBeenCalledTimes(1);
    });

    test("should handle an empty restaurant list", () => {
        const emptyRestaurantList = [];
        const setRestaurantSelected = jest.fn();
        const setCenter = jest.fn();
        const setMapZoom = jest.fn();

        const { getByText } = render(
            <RandomRestaurant
                restaurantList={emptyRestaurantList}
                setRestaurantSelected={setRestaurantSelected}
                setCenter={setCenter}
                setMapZoom={setMapZoom}
            />,
        );

        fireEvent.click(getByText("I'm feeling hungry"));

        // Check that the setRestaurantSelected, setCenter, and setMapZoom functions were not called
        expect(setRestaurantSelected).not.toHaveBeenCalled();
        expect(setCenter).not.toHaveBeenCalled();
        expect(setMapZoom).not.toHaveBeenCalled();
    });

    test("should handle a restaurant with missing latitude and longitude", () => {
        const restaurantList = [
            { id: 1 }, // Missing latitude and longitude
        ];
        const setRestaurantSelected = jest.fn();
        const setCenter = jest.fn();
        const setMapZoom = jest.fn();

        const { getByText } = render(
            <RandomRestaurant
                restaurantList={restaurantList}
                setRestaurantSelected={setRestaurantSelected}
                setCenter={setCenter}
                setMapZoom={setMapZoom}
            />,
        );

        fireEvent.click(getByText("I'm feeling hungry"));

        expect(setRestaurantSelected).not.toHaveBeenCalled();
        expect(setCenter).not.toHaveBeenCalled();
        expect(setMapZoom).not.toHaveBeenCalled();
    });
});
