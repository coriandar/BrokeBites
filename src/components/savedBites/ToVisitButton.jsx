import React, { useEffect, useState } from "react";
import { auth } from "@/database/firebase/firebaseApp";
import {
    addRestaurantToVisit,
    removeRestaurantToVisit,
    fetchUserList,
} from "@/database/firebase/firestore/userDB";
import { Button } from "../ui/shadcn-ui/button";

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
        <Button
            variant={"secondary"}
            className={"mr-1 h-6 rounded-full"}
            onClick={isToVisit ? removeToVisit : addToVisit}
        >
            {isToVisit ? "Remove To-Visit" : "To-Visit"}
        </Button>
    );
}
