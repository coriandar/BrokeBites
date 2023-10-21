import React from "react";
import { Button } from "../ui/shadcn-ui/button";
import { fetchRecommendedList } from "./components/recommendationLogic";
import RecommendContainer from "./components/RecommendContainer";

export default function GetRecommendation() {
    const [recommendedList, setRecommendedList] = React.useState([]);

    // const createNewList = () => {
    //     setRecommendedList(fetchRecommendedList());
    // };

    return (
        <div className="flex flex-col items-center justify-center">
            {/* <Button onClick={createNewList}>Get Recommendations</Button>
            {recommendedList.length > 0 ? (
                <RecommendContainer restaurants={recommendedList} />
            ) : (
                <p>No recommendations found, please try again.</p>
            )} */}
        </div>
    );
}
