import { db } from "@/database/firebase/firebaseApp";
import {
    collection,
    getDocs,
    updateDoc,
    addDoc,
    deleteField,
} from "firebase/firestore";

const colName = "testDB";

const querySnapshot = await getDocs(collection(db, colName));
// add field
// querySnapshot.forEach((doc) => {
//     let rating = Math.floor(Math.random() * 5) + 1;
//     const newField = { starRating: rating };

//     updateDoc(doc.ref, newField)
//         .then(() => {
//             console.log(`Done: ${doc.id}`);
//         })
//         .catch((error) => {
//             console.log(`Error: ${doc.id}`);
//         });
// });

// remove field
// querySnapshot.forEach((doc) => {
//     updateDoc(doc.ref, {
//         rating: deleteField(),
//     });
// });

export default function DB_AddField() {
    return <div>Add Field Ran</div>;
}
