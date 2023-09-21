import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { firebaseConfig } from "@/config/Firebase.config";
import {
    getFirestore,
    getDocs,
    collection,
    filter,
    query,
    where,
} from "firebase/firestore";
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
        return filteredData;
    } catch (err) {
        console.error(err);
    }
};

{
    /*export const getSelectedUserProfile = async (selectedUserID) => {
    try {
        const userDocRef = doc(db, "userDB", selectedUserID); // Use uid to fetch the user document
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            return userData;
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};*/
}

export const getUserReviews = async (selectedUserID) => {
    // try {
    //     console.log("In getUserReviews for", selectedUserID);
    //     const reviewsCollectionRef = collection(db, "reviewDB");
    //     {
    //         const reviewsQuery = query(
    //         collection(db, "reviewDB"),
    //         where("userID", "==", selectedUserID)
    //     );
    //     }

    //     const data = await getDocs(reviewsCollectionRef);

    //     console.log("in getUserReviews", data);
    //     return data;
    // } catch (err) {
    //     console.error(err);
    // }

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
