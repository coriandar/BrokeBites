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

// TODO: Sprint 2: refactor logic, move to a feature folder
// TODO: Sprint2: Increase performance/lower memory, store index in list, then iterate based on index.
export const getFilteredSearch = (items, query) => {
    if (!query) {
        return items;
    }
    const lowercaseQuery = query.toLowerCase(); // Convert the query to lowercase

    return items.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(lowercaseQuery)
    );
};

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

export const getFilteredStarRating = (items, values) => {
    if (!values) {
        return items;
    }
    return items.filter(
        (restaurant) =>
            restaurant.starRating >= values[0] &&
            restaurant.starRating <= values[1]
    );
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
