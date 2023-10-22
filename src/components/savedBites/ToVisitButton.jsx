import React, { useEffect, useState } from "react";
import { auth } from "@/database/firebase/firebaseApp";
import {
    addRestaurantToVisit,
    removeRestaurantToVisit,
    fetchUserList,
} from "@/database/firebase/firestore/userDB";
import { ButtonCircleIcon } from "../ui/buttons/ButtonCircleIcon";
import { Bookmark, BookmarkCheck } from "lucide-react";
import Tooltip from "../ui/tooltip/Tooltip";

export default function ToVisitButton({ selectedRestaurant }) {
    const currentUserID = auth.currentUser?.uid;
    const [isToVisit, setIsToVisit] = useState(false);

    // Update isToVisit when selectedRestaurant changes
    useEffect(() => {
        const checkIsToVisit = async () => {
            const toVisit = await fetchUserList(currentUserID, "toVisit");
            setIsToVisit(toVisit?.includes(selectedRestaurant.id));
        };

        if (currentUserID && selectedRestaurant) checkIsToVisit();
    }, [currentUserID, selectedRestaurant, isToVisit]);

    const addToVisit = async () => {
        await addRestaurantToVisit(selectedRestaurant);
        setIsToVisit(true);
    };

    const removeToVisit = async () => {
        await removeRestaurantToVisit(selectedRestaurant);
        setIsToVisit(false);
    };

    return (
        <div className="group relative cursor-pointer py-2">
            <Tooltip text={isToVisit ? "Remove To-Visit" : "Add To-Visit"} />
            <ButtonCircleIcon
                action={() => {
                    isToVisit ? removeToVisit() : addToVisit();
                }}
            >
                {isToVisit ? <BookmarkCheck /> : <Bookmark />}
            </ButtonCircleIcon>
        </div>
    );
}
