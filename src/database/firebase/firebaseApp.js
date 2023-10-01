import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "@/config/Firebase.config";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const getAllRestaurants = async () => {
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

export const getUserReviews = async (selectedUserID) => {
    try {
        const userReviewCollectionRef = collection(db, "reviewDB");
        const data = await getDocs(userReviewCollectionRef);
        const filteredData = data.docs
            .map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            .filter((review) => review.userID === selectedUserID);

        console.log("In getUserReviews for:", selectedUserID, filteredData);

        return filteredData;
    } catch (err) {
        console.error(err);
    }
};

export const getRestaurantReviews = async (selectedRestaurantID) => {
    try {
        const restaurantReviewCollectionRef = collection(db, "reviewDB");
        const data = await getDocs(restaurantReviewCollectionRef);
        const filteredData = data.docs
            .map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            .filter((review) => review.restaurantID === selectedRestaurantID);

        console.log(
            "In getUserReviews for:",
            selectedRestaurantID,
            filteredData
        );

        return filteredData;
    } catch (err) {
        console.error(err);
    }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
