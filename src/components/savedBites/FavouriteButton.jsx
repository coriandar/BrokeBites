import React, { useEffect, useState } from "react";
import { auth } from "@/database/firebase/firebaseApp";
import {
    addRestaurantFavourite,
    removeRestaurantFavourite,
    fetchUserList,
} from "@/database/firebase/firestore/userDB";
<<<<<<< HEAD
import { addFavouritePost } from "@/database/firebase/firestore/userFeedDB";
=======
import { ButtonCircleIcon } from "../ui/buttons/ButtonCircleIcon";
import { Heart, HeartOff } from "lucide-react";
import { TopTooltip } from "../ui/tooltip/Tooltip";
>>>>>>> b3fa0256ddf9ecada93a24b93bcc0da3432a3919

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
    }, [currentUserID, selectedRestaurant, isFavourite]);

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
        <div className="group relative cursor-pointer py-2">
            <TopTooltip
                text={isFavourite ? "Remove Favourite" : "Add Favourite"}
            />
            <ButtonCircleIcon
                action={() => {
                    isFavourite ? removeFavourite() : addFavourite();
                }}
            >
                {isFavourite ? <Heart /> : <HeartOff />}
            </ButtonCircleIcon>
        </div>
    );
}
