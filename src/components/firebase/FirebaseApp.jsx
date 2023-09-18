import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { firebaseConfig } from "@/config/Firebase.config";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

// storage
// must update rules to: only allow if auth/size/path
export async function upload(file, currentUser, setLoading, setPhotoURL) {
    const fileRef = ref(storage, "/avatar/" + currentUser.uid + ".jpg");

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file); // uploads
    const newPhotoURL = await getDownloadURL(fileRef); // get link of new photo
    setPhotoURL(newPhotoURL);
    updateProfile(currentUser, { photoURL: newPhotoURL }); // update the photo

    setLoading(false);
    alert("File successfully uploaded...");
}

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
const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
