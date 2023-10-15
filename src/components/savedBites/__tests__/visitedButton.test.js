import VisitedButton from "../VisitedButton";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    addRestaurantVisited,
    removeRestaurantVisited,
} from "@/database/firebase/firestore/userDB";

jest.mock("../../__shared__/ui/ButtonSmall", () => ({
    __esModule: true,
    default: ({ label, action }) => <button onClick={action}>{label}</button>,
}));

jest.mock("../../../database/firebase/firebaseApp", () => ({
    auth: {
        currentUser: {
            uid: "mockUserId",
        },
    },
}));

jest.mock("../../../database/firebase/firestore/userDB", () => ({
    fetchUserList: jest.fn(),
    addRestaurantVisited: jest.fn(),
    removeRestaurantVisited: jest.fn(),
}));

describe("VisitedButton", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("if button is 'Visited' should render as 'Remove visited' after clicking", () => {
        const { getByText } = render(<VisitedButton />);
        const button = getByText("Visited");

        fireEvent.click(button);

        expect(getByText("Remove Visited")).toBeInTheDocument();
    });

    test("if button is 'Remove visited' should render as 'Visited' after clicking", () => {
        const { getByText } = render(<VisitedButton />);
        const button = getByText("Visited");

        fireEvent.click(button); // click add to visited
        fireEvent.click(button); // click to remove visited

        expect(getByText("Visited")).toBeInTheDocument();
    });

    test("should trigger addRestaurantVisited", () => {
        // jest.clearAllMocks();
        const { getByText } = render(<VisitedButton />);
        const button = getByText("Visited");

        fireEvent.click(button); // click add to visited

        expect(addRestaurantVisited).toHaveBeenCalledTimes(1);
    });

    test("should trigger removeRestaurantVisited", () => {
        const { getByText } = render(<VisitedButton />);
        const button = getByText("Visited");

        fireEvent.click(button); // click add to visited
        fireEvent.click(button); // click to remove visited

        expect(removeRestaurantVisited).toHaveBeenCalledTimes(1);
    });
});
