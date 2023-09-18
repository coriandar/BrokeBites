import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "@/config/Firebase.config";
import { getFirestore, getDocs, collection } from "firebase/firestore";

export const getAllRestaurants = async () => {
    //Try to connect to the DB then brng the data over to the app
    try {
        const restaurantCollectionRef = collection(db, "restaurantDB");
        const data = await getDocs(restaurantCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        console.log(filteredData);
        return filteredData;
    } catch (err) {
        console.error(err);
    }
};

// TODO: Sprint 2: refactor logic, move to a feature folder
// TODO: Sprint2: Increase performance/lower memory, store index in list, then iterate based on index.
export const getFilteredRestaurants = (items, query) => {
    if (!query) {
        return items;
    }
    const lowercaseQuery = query.toLowerCase(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(lowercaseQuery)
    );
};

//return a list containing the restaurants that match the values
export const getFilteredPriceRating = (items, values) => {
    if (!values) {
        return items;
    }
    return items.filter(
        (restaurant) =>
            restaurant.priceRating >= values[0] &&
            restaurant.priceRating <= values[1]
    );
};

//return a list containing the restaurants that match the category
export const getFilteredFillingFactor = (items, value) => {
    if (!value || value === "All") {
        return items;
    }

    return items.filter((restaurant) => restaurant.fillingFactor === value);
};

//return a list containing the restaurants that match the category
export const getFilteredCuisine = (items, value) => {
    if (!value || value === "All") {
        return items;
    }
    return items.filter((restaurant) => restaurant.cuisine === value);
};

//return a list of sorted restaurants based on price rating
export const getSortedPriceRating = (items, order) => {
    // Use the sort() method to sort the items based on price rating
    let sortedItems;

    if (order === "descending") {
        sortedItems = [...items].sort((a, b) => b.priceRating - a.priceRating);
    } else if (order === "ascending") {
        sortedItems = [...items].sort((a, b) => a.priceRating - b.priceRating);
    } else {
        //return original list
        return items;
    }

    //return sortedList
    return sortedItems;
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
