import { auth } from "@/database/firebase/firebaseApp";
import {
    fetchUserList,
    addRestaurantVisited,
    removeRestaurantVisited,
} from "@/database/firebase/firestore/userDB";
import { useEffect, useState } from "react";
import { Button } from "../ui/shadcn-ui/button";
import { ButtonCircleIcon } from "../ui/buttons/ButtonCircleIcon";
import { LayoutList, ListChecks } from "lucide-react";

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
        <ButtonCircleIcon
            action={() => {
                isVisited ? removeVisited() : addVisited();
            }}
        >
            {isVisited ? <ListChecks /> : <LayoutList />}
        </ButtonCircleIcon>
    );
}
