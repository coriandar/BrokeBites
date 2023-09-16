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
        // Create a reference to the user's document in Firestore
        const userDocRef = doc(firestore, "userDB", currentUserId);

        // Fetch the user's data
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const listRestaurantIds = userData[listName] || [];

            // Create an array to store restaurant data
            const restaurantPromises = listRestaurantIds.map(
                async (restaurantId) => {
                    // Create a reference to the restaurant document in Firestore
                    const restaurantDocRef = doc(
                        firestore,
                        "restaurantDB",
                        restaurantId
                    );

                    // Fetch the restaurant data
                    const restaurantDocSnapshot = await getDoc(
                        restaurantDocRef
                    );

                    if (restaurantDocSnapshot.exists()) {
                        return restaurantDocSnapshot.data();
                    }
                    return null;
                }
            );

            // Wait for all restaurant data to be fetched
            const restaurantDataList = await Promise.all(restaurantPromises);
            console.log(`Saved: ${restaurantDataList}`);

            // Filter out null values
            return restaurantDataList.filter(Boolean);
        }
    } catch (error) {
        console.error("Error fetching restaurant data:", error);
    }
    return [];
};
