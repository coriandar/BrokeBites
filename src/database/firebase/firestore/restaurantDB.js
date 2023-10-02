import { db } from "../firebaseApp";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export const fetchRestaurant = async (restaurantId) => {
    // Create a reference to the restaurant document in Firestore
    const restaurantDocRef = doc(db, "restaurantDB", restaurantId);

    // Fetch the restaurants data
    const restaurantDocSnapshot = await getDoc(restaurantDocRef);

    if (!restaurantDocSnapshot.exists()) return null;

    const restaurantData = {
        ...restaurantDocSnapshot.data(),
        id: restaurantId,
    };
    return restaurantData;
};

export const fetchAllRestaurants = async () => {
    //Try to connect to the DB then brng the data over to the app
    try {
        const restaurantCollectionRef = collection(db, "restaurantDB");
        const data = await getDocs(restaurantCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return filteredData;
    } catch (err) {
        console.error(err);
    }
};
