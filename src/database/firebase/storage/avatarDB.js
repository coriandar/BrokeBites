import { storage } from "../firebaseApp";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateAvatarUserDB } from "../firestore/userDB";

// must update rules to: only allow if auth/size/path
export async function uploadAvatar(file, currentUser, setLoading, setPhotoURL) {
    const fileRef = ref(storage, "/avatar/" + currentUser.uid + ".jpg");

    setLoading(true);

    await uploadBytes(fileRef, file); // uploads
    const newPhotoURL = await getDownloadURL(fileRef); // get link of new photo
    setPhotoURL(newPhotoURL);
    updateProfile(currentUser, { photoURL: newPhotoURL }); // update the photo
    updateAvatarUserDB(newPhotoURL);
    console.log(newPhotoURL);

    setLoading(false);
    alert("File successfully uploaded...");
}
