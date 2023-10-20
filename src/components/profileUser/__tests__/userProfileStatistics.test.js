import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfileStatistics from "../UserProfileStatistics";

describe("UserProfileStatistics", () => {
    test("should render following of size 3", () => {
        const userProfile = { following: [1, 2, 3] };

        const { getByText } = render(
            <UserProfileStatistics userProfile={userProfile} />,
        );

        expect(getByText("Following:3")).toBeInTheDocument();
    });

    test("should render following as 0 if following is null", () => {
        const userProfile = { following: null };

        const { getByText } = render(
            <UserProfileStatistics userProfile={userProfile} />,
        );

        expect(getByText("Following:0")).toBeInTheDocument();
    });

    test("should render component with valid data", () => {
        const userProfile = {
            following: [1, 2, 3],
            followers: [1, 2, 3],
        };
        const userReviews = [1, 2, 3];

        const { getByText } = render(
            <UserProfileStatistics
                userProfile={userProfile}
                userReviews={userReviews}
            />,
        );

        expect(getByText("Following:3")).toBeInTheDocument();
        expect(getByText("Followers:3")).toBeInTheDocument();
        expect(getByText("Reviews:3")).toBeInTheDocument();
    });

    test("should render component with no data", () => {
        const { getByText } = render(<UserProfileStatistics />);

        expect(getByText("Following:0")).toBeInTheDocument();
        expect(getByText("Followers:0")).toBeInTheDocument();
        expect(getByText("Reviews:0")).toBeInTheDocument();
    });
});
