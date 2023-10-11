import React, { useEffect } from "react";
import FavouriteButton from "../../savedBites/FavouriteButton";
import { getAuth } from "firebase/auth";
import ToVisitButton from "../../savedBites/ToVisitButton";
import ReviewModal from "../../review/ReviewModal";
import { CheckUserDB } from "../../account/UserDB";
import GetDirections from "./GetDirections";
import Link from "next/link";
import { MenuButton } from "./MenuButton";
import { OrderButton } from "./OrderButton";
import { ShareContainer } from "./ShareContainer";
import VisitedButton from "@/components/savedBites/VisitedButton";

export default function MarkerDetails({ selected, userGeo }) {
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            CheckUserDB();
            console.log("User added to DB from MarkerDetails");
        }
    }, [user]);

    if (!selected) {
        return (
            <div id="SelectedMarkerDetails">
                <h3>Nothing selected</h3>
            </div>
        );
    }

    return (
        <div id="SelectedMarkerDetails">
            <Link href={`/restaurant/${selected.id}`}>
                <h3 className="font-bold">{selected.name}</h3>
            </Link>
            <div className="flex -ml-1">
                <MenuButton selected={selected} />
                {user ? <FavouriteButton selectedRestaurant={selected} /> : ""}
                {user ? <ToVisitButton selectedRestaurant={selected} /> : ""}
                {user ? <VisitedButton selectedRestaurant={selected} /> : ""}
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
