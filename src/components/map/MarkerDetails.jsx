import React from "react";
import FavouriteButton from "../savedBites/FavouriteButton";
import { getAuth } from "firebase/auth";
import ToVisitButton from "../savedBites/ToVisitButton";
import MenuModal from "../modal/MenuModal";
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";
import ReviewModal from "../review/ReviewModal";

export default function MarkerDetails({ selected }) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!selected) {
        return (
            <div id="SelectedMarkerDetails">
                <h3>Nothing selected</h3>
            </div>
        );
    }

    return (
        <div id="SelectedMarkerDetails">
            <h3 className="font-bold">{selected.name}</h3>
            <div className="flex -ml-1">
                <MenuModal selectedRestaurant={selected} />
                {user ? <FavouriteButton selectedRestaurant={selected} /> : ""}
                {user ? <ToVisitButton selectedRestaurant={selected} /> : ""}
                <ReviewModal selectedRestaurant={selected} />
            </div>

            <h3>Filling Factor: {selected.fillingFactor}</h3>
            <h3>Price rating: {selected.priceRating}</h3>
            <h3>Star rating: {selected.starRating}</h3>
            <h3>Cusine: {selected.cuisine}</h3>
            <h3>Dietary: {selected.dietary}</h3>

            <h3>
                Phone: {selected.contactNumber ? selected.contactNumber : "n/a"}
            </h3>

            <h3>
                Website:{" "}
                {selected.website ? (
                    <a
                        href={selected.website}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Link
                    </a>
                ) : (
                    "n/a"
                )}
            </h3>

            {user ? (
                <div>
                    <FacebookShareButton
                        url={selected.website}
                        quote="Take a look at this place!"
                    >
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <EmailShareButton
                        url={selected.website}
                        subject="Take a look at this place!"
                    >
                        <EmailIcon size={32} round={true} />
                    </EmailShareButton>
                    <TwitterShareButton
                        url={selected.website}
                        title="Take a look at this place!"
                    >
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                </div>
            ) : null}
        </div>
    );
}
