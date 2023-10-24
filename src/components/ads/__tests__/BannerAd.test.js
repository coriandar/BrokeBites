import { rerender, render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import the extend-expect library
import BannerAd from "../BannerAd";

describe("BannerAD", () => {
    it("should render the banner ad", () => {
        render(<BannerAd isPremium={false} />);
        expect(screen.getByText(/ad banner/i)).toBeInTheDocument();
    });

    it("should not render the banner ad when the user is premium", () => {
        render(<BannerAd isPremium={true} />);
        expect(screen.queryByText(/ad banner/i)).not.toBeInTheDocument();
    });

    it("should render the ad banner with the close button", () => {
        render(<BannerAd isPremium={false} />);
        const banner = screen.getByText("Ad Banner");
        expect(banner).toBeInTheDocument();

        // Check if the close button is visible
        const closeButton = screen.getByText("X");
        expect(closeButton).toBeInTheDocument();

        // Click the close button
        fireEvent.click(closeButton);

        // Verify that the banner is no longer visible
        const updatedBanner = screen.queryByText("Ad Banner");
        expect(updatedBanner).not.toBeInTheDocument();
    });

    it("should hide the ad banner when the close button is clicked", () => {
        render(<BannerAd isPremium={false} />);
        const closeButton = screen.getByText("X");

        // Ensure the banner is initially visible
        let banner = screen.queryByText(/ad banner/i);
        expect(banner).toBeInTheDocument();

        fireEvent.click(closeButton);

        // Ensure the banner is no longer visible
        banner = screen.queryByText(/ad banner/i);
        expect(banner).not.toBeInTheDocument();
    });
});
