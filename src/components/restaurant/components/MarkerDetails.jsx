import React from "react";
import FavouriteButton from "../../savedBites/FavouriteButton";
import { getAuth } from "firebase/auth";
import ToVisitButton from "../../savedBites/ToVisitButton";
import ReviewModal from "../../review/ReviewModal";
import GetDirections from "./GetDirections";
import Link from "next/link";
import { MenuButton } from "./MenuButton";
import { OrderButton } from "./OrderButton";
import { ShareContainer } from "./ShareContainer";
import VisitedButton from "@/components/savedBites/VisitedButton";

export default function MarkerDetails({ selected, userGeo }) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!selected) {
        return <div id="SelectedMarkerDetails"></div>;
    }

    return (
        <div id="SelectedMarkerDetails">
            <Link href={`/restaurant/${selected.id}`}>
                <h3 className="font-bold">{selected.name}</h3>
            </Link>
            <div className="-ml-1 flex">
                <MenuButton selected={selected} />
                <FavouriteButton selectedRestaurant={selected} />
                <ToVisitButton selectedRestaurant={selected} />
                <VisitedButton selectedRestaurant={selected} />
                <ReviewModal selectedRestaurant={selected} />
                <GetDirections selected={selected} userGeo={userGeo} />
                <OrderButton selected={selected} />
            </div>

            <h3>Address: {selected?.address}</h3>
            <h3>Filling Factor: {selected?.fillingFactor}</h3>
            <h3>Price rating: {selected?.priceRating}</h3>
            <h3>Star rating: {selected?.starRating}</h3>
            <h3>Cusine: {selected?.cuisine}</h3>
            <h3>Dietary: {selected?.dietary}</h3>
            <h3>Phone: {selected?.contactNumber}</h3>

            <ShareContainer selected={selected} />
        </div>
    );
}
