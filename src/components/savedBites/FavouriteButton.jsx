import React, { useEffect, useState } from "react";
import { auth } from "@/database/firebase/firebaseApp";
import {
    addRestaurantFavourite,
    removeRestaurantFavourite,
    fetchUserList,
} from "@/database/firebase/firestore/userDB";
import { ButtonCircleIcon } from "../ui/buttons/ButtonCircleIcon";
import { Heart, HeartOff } from "lucide-react";

export default function FavouriteButton({ selectedRestaurant }) {
    const currentUserID = auth.currentUser?.uid;
    const [isFavourite, setIsFavourite] = useState(false);
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    // Update isFavourite when selectedRestaurant changes
    useEffect(() => {
        const checkIsFavourite = async () => {
            const favourite = await fetchUserList(currentUserID, "favourite");
            setIsFavourite(favourite?.includes(selectedRestaurant.id));
        };

        if (currentUserID && selectedRestaurant) checkIsFavourite();
    }, [currentUserID, selectedRestaurant, isFavourite]);

    const addFavourite = async () => {
        await addRestaurantFavourite(selectedRestaurant);
        setIsFavourite(true);
    };

    const removeFavourite = async () => {
        await removeRestaurantFavourite(selectedRestaurant);
        setIsFavourite(false);
    };

    const showTooltip = () => {
        setTooltipVisible(true);
    };

    const hideTooltip = () => {
        setTooltipVisible(false);
    };

    return (
        <ButtonCircleIcon
            action={() => {
                isFavourite ? removeFavourite() : addFavourite();
            }}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {isFavourite ? <Heart /> : <HeartOff />}
        </ButtonCircleIcon>
    );
}
