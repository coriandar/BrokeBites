import { auth } from "@/database/firebase/firebaseApp";
import {
    fetchUserList,
    addRestaurantVisited,
    removeRestaurantVisited,
} from "@/database/firebase/firestore/userDB";
import { useEffect, useState } from "react";
import ButtonSmall from "../__shared__/ui/ButtonSmall";

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
    });

    const addVisited = async () => {
        setIsVisited(true);
        await addRestaurantVisited(selectedRestaurant);
    };

    const removeVisited = async () => {
        setIsVisited(false);
        await removeRestaurantVisited(selectedRestaurant);
    };

    return (
        <ButtonSmall
            label={isVisited ? "Remove Visited" : "Visited"}
            action={isVisited ? removeVisited : addVisited}
        />
    );
}
