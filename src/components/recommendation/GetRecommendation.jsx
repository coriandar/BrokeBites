import React from "react";
import { auth } from "@/database/firebase/firebaseApp";
import { fetchAllRestaurants } from "@/database/firebase/firestore/restaurantDB";
import {
    mergeLists,
    fetchRecommendedList,
} from "./components/recommendationLogic";
import {
    fetchFavouritesList,
    fetchToVisitList,
    fetchVisitedList,
} from "@/database/firebase/firestore/userDB";
import { Button } from "../ui/shadcn-ui/button";
import RecommendContainer from "./components/RecommendContainer";
import { Icons } from "../ui/icons/icons";

export default function GetRecommendation() {
    const uid = auth?.currentUser?.uid;
    const [nearby, setNearby] = React.useState(false);
    const [mergedList, setMergedList] = React.useState([]);
    const [masterList, setMasterList] = React.useState([]);
    const [recommendedList, setRecommendedList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const createRecommendList = () => {
        if (mergedList.length > 0 && masterList.length > 0) {
            setRecommendedList(
                fetchRecommendedList(mergedList, masterList, nearby),
            );
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        createRecommendList();
    }, [mergedList, masterList]);

    const getRecommendations = async () => {
        setIsLoading(true);
        if (mergedList.length === 0) {
            console.log("loading merged");
            setMergedList(
                mergeLists(
                    await fetchFavouritesList(uid),
                    await fetchToVisitList(uid),
                    await fetchVisitedList(uid),
                ),
            );
        }

        if (masterList.length === 0) {
            console.log("loading master");
            setMasterList(await fetchAllRestaurants());
        }
        createRecommendList();
    };

    return (
        <div className="flex h-[400px] flex-col items-center justify-center">
            <Button disabled={isLoading} onClick={getRecommendations}>
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Get Recommendations
            </Button>

            <Button
                disabled={isLoading}
                variant={"secondary"}
                onClick={() => setNearby(!nearby)}
            >
                Nearby: {nearby ? "Enabled" : "Disabled"}
            </Button>
            {recommendedList.length > 0 && (
                <RecommendContainer restaurants={recommendedList} />
            )}
        </div>
    );
}
