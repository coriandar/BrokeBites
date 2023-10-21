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

export default function GetRecommendation() {
    const uid = auth?.currentUser?.uid;
    const [nearby, setNearby] = React.useState(false);
    const [mergedList, setMergedList] = React.useState([]);
    const [masterList, setMasterList] = React.useState([]);
    const [recommendedList, setRecommendedList] = React.useState([]);

    React.useEffect(() => {
        // add loading wheel, disable button
        if (mergedList.length > 0 && masterList.length > 0) {
            setRecommendedList(
                fetchRecommendedList(mergedList, masterList, nearby),
            );
            console.log("useeffect");
        }
    }, [mergedList, masterList]);

    const getRecommendations = async () => {
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

        if (mergedList.length > 0 && masterList.length > 0) {
            setRecommendedList(
                await fetchRecommendedList(mergedList, masterList, nearby),
            );
            console.log("using previous fetch");
        }
    };

    return (
        <div className="flex h-[400px] flex-col items-center justify-center">
            <Button onClick={getRecommendations}>Get Recommendations</Button>
            <Button variant={"secondary"} onClick={() => setNearby(!nearby)}>
                Nearby: {nearby ? "Enabled" : "Disabled"}
            </Button>
            {recommendedList.length > 0 ? (
                <RecommendContainer restaurants={recommendedList} />
            ) : (
                <p>No recommendations found, please try again.</p>
            )}
        </div>
    );
}
