import React, { useEffect, useState } from "react";
import ButtonSmall from "../__shared__/ui/ButtonSmall";
import { auth } from "@/database/firebase/firebaseApp";
import {
    addRestaurantToVisit,
    removeRestaurantToVisit,
    fetchUserList,
} from "@/database/firebase/firestore/userDB";

export default function ToVisitButton({ selectedRestaurant }) {
    const currentUserID = auth.currentUser?.uid;
    const [isToVisit, setIsToVisit] = useState(false);

    // Update isToVisit when selectedRestaurant changes
    useEffect(() => {
        const checkIsToVisit = async () => {
            const toVisit = await fetchUserList(currentUserID, "toVisit");
            setIsToVisit(toVisit.includes(selectedRestaurant.id));
        };

        if (currentUserID && selectedRestaurant) checkIsToVisit();
    }, [currentUserID, selectedRestaurant]);

    const addToVisit = async () => {
        await addRestaurantToVisit(selectedRestaurant);
        setIsToVisit(true);
    };

    const removeToVisit = async () => {
        await removeRestaurantToVisit(selectedRestaurant);
        setIsToVisit(false);
    };

    return (
        <ButtonSmall
            label={isToVisit ? "Remove To-Visit" : "To-Visit"}
            action={isToVisit ? removeToVisit : addToVisit}
        />
    );
}
