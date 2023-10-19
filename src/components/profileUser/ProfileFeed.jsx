import { fetchFeed } from "../../database/firebase/firestore/userFeedDB";

export const initFeed = (uid) => {
    const feed = fetchFeed(uid);
    console.log(feed);
};
