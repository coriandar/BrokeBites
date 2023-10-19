import React, { useEffect, useState } from "react";
import ButtonSmall from "../__shared__/ui/ButtonSmall";
import { auth } from "@/database/firebase/firebaseApp";
import {
    addRestaurantFavourite,
    removeRestaurantFavourite,
    fetchUserList,
} from "@/database/firebase/firestore/userDB";
import { Button } from "../ui/shadcn-ui/button";

export default function FavouriteButton({ selectedRestaurant }) {
    const currentUserID = auth.currentUser?.uid;
    const [isFavourite, setIsFavourite] = useState(false);

    // Update isFavourite when selectedRestaurant changes
    useEffect(() => {
        const checkIsFavourite = async () => {
            const favourite = await fetchUserList(currentUserID, "favourite");
            setIsFavourite(favourite?.includes(selectedRestaurant.id));
        };

        if (currentUserID && selectedRestaurant) checkIsFavourite();
    }, [currentUserID, selectedRestaurant]);

    const addFavourite = async () => {
        await addRestaurantFavourite(selectedRestaurant);
        setIsFavourite(true);
    };

    const removeFavourite = async () => {
        await removeRestaurantFavourite(selectedRestaurant);
        setIsFavourite(false);
    };

    return (
        <Button
            variant={"secondary"}
            className={"mr-1 h-6 rounded-full"}
            onClick={isFavourite ? removeFavourite : addFavourite}
        >
            {isFavourite ? "Remove favourite" : "Favourite"}
        </Button>
    );
}
