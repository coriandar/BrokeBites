import { fetchFeed } from "../../database/firebase/firestore/userFeedDB";

export const initFeed = async (uid) => {
    try {
        const feed = await fetchFeed(uid);
        if (feed) {
            console.log("User Feed Data:", feed);
            // You can do more with the 'feed' data here as needed.
        } else {
            console.log("User feed not found or does not exist.");
        }
    } catch (error) {
        console.error("Error fetching user feed data:", error);
    }
};
