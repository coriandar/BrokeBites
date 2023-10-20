import { auth } from "@/database/firebase/firebaseApp";
import {
    fetchUserList,
    addRestaurantVisited,
    removeRestaurantVisited,
} from "@/database/firebase/firestore/userDB";
import { useEffect, useState } from "react";
import { Button } from "../ui/shadcn-ui/button";

export default function VisitedButton({ selectedRestaurant }) {
    const currentUserID = auth.currentUser?.uid;
    const [isVisited, setIsVisited] = useState(false);

    useEffect(() => {
        const checkIsVisited = async () => {
            const visited = await fetchUserList(currentUserID, "visited");
            setIsVisited(visited?.includes(selectedRestaurant.id));
        };

        if (currentUserID && selectedRestaurant) {
            checkIsVisited();
        }
    }, [currentUserID, selectedRestaurant]);

    const addVisited = async () => {
        setIsVisited(true);
        await addRestaurantVisited(selectedRestaurant);
    };

    const removeVisited = async () => {
        setIsVisited(false);
        await removeRestaurantVisited(selectedRestaurant);
    };

    return (
        <Button
            variant={"secondary"}
            className={"mr-1 h-6 rounded-full"}
            onClick={isVisited ? removeVisited : addVisited}
        >
            {isVisited ? "Remove Visited" : "Visited"}
        </Button>
    );
}
