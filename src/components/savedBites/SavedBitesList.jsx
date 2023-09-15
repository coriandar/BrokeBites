import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const fetchSavedBitesList = async (listType) => {
    const firestore = getFirestore();
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;

    const listName = listType === "favourite" ? "favourite" : "toVisit"; // Determine which list to fetch

    if (!currentUserId) return [];

    try {
        const userDocRef = doc(firestore, "userDB", currentUserId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const listRestaurantIds = userData[listName] || [];

            const restaurantPromises = listRestaurantIds.map(
                async (restaurantId) => {
                    const restaurantDocRef = doc(
                        firestore,
                        "restaurantDB",
                        restaurantId
                    );

                    const restaurantDocSnapshot = await getDoc(
                        restaurantDocRef
                    );

                    if (restaurantDocSnapshot.exists()) {
                        return restaurantDocSnapshot.data();
                    }
                    return null;
                }
            );

            const restaurantDataList = await Promise.all(restaurantPromises);
            console.log(`Saved: ${restaurantDataList}`);
            return restaurantDataList.filter(Boolean);
        }
    } catch (error) {
        console.error("Error fetching restaurant data:", error);
    }
    return [];
};
