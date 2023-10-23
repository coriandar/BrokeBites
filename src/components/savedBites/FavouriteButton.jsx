import React, { useEffect, useState } from "react";
import ButtonSmall from "../__shared__/ui/ButtonSmall";
import { auth } from "@/database/firebase/firebaseApp";
import {
    addRestaurantFavourite,
    removeRestaurantFavourite,
    fetchUserList,
} from "@/database/firebase/firestore/userDB";
import { addFavouritePost } from "@/database/firebase/firestore/userFeedDB";

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
        await addFavouritePost(currentUserID, selectedRestaurant.id);
        setIsFavourite(true);
    };

    const removeFavourite = async () => {
        await removeRestaurantFavourite(selectedRestaurant);
        setIsFavourite(false);
    };

    return (
        <ButtonSmall
            label={isFavourite ? "Remove favourite" : "Favourite"}
            action={isFavourite ? removeFavourite : addFavourite}
        />
    );
}
