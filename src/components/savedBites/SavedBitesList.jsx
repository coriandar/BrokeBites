import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const fetchUserSavedList = async (currentUserId, listName) => {
    const firestore = getFirestore();

    // Create a reference to the user's document in Firestore
    const userDocRef = doc(firestore, "userDB", currentUserId);

    // Fetch the user's data
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
        throw new Error("User document doesn't exist.");
    }

    const userData = userDocSnapshot.data();

    return userData[listName] || [];
};

const fetchRestaurantData = async (restaurantId) => {
    const firestore = getFirestore();

    // Create a reference to the restaurant document in Firestore
    const restaurantDocRef = doc(firestore, "restaurantDB", restaurantId);

    // Fetch the restaurant data
    const restaurantDocSnapshot = await getDoc(restaurantDocRef);

    if (!restaurantDocSnapshot.exists()) return null;

    return restaurantDocSnapshot.data();
};

export const fetchSavedBitesList = async (listType) => {
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;

    const listName = listType === "favourite" ? "favourite" : "toVisit"; // Determine which list to fetch

    if (!currentUserId) return [];

    try {
        const listRestaurantIds = await fetchUserSavedList(
            currentUserId,
            listName
        );

        // Create an array to store restaurant data
        const restaurantPromises = listRestaurantIds.map(fetchRestaurantData);

        // Wait for all restaurant data to be fetched
        const restaurantDataList = await Promise.all(restaurantPromises);

        // Filter out null values
        return restaurantDataList.filter(Boolean);
    } catch (error) {
        console.error("Error fetching restaurant data:", error);
        throw error;
    }
};
