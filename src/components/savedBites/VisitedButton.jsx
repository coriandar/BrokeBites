import { auth } from "@/database/firebase/firebaseApp";
import {
    fetchUserList,
    addRestaurantVisited,
    removeRestaurantVisited,
} from "@/database/firebase/firestore/userDB";
import { useEffect, useState } from "react";
import { ButtonCircleIcon } from "../ui/buttons/ButtonCircleIcon";
import { LayoutList, ListChecks } from "lucide-react";
import Tooltip from "../ui/tooltip/Tooltip";

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
        <div className="group relative cursor-pointer py-2">
            <Tooltip text={isVisited ? "Remove Visited" : "Add Visited"} />
            <ButtonCircleIcon
                action={() => {
                    isVisited ? removeVisited() : addVisited();
                }}
            >
                {isVisited ? <ListChecks /> : <LayoutList />}
            </ButtonCircleIcon>
        </div>
    );
}
