import { db } from "../firebase/FirebaseApp.jsx";
import { collection, getDocs, updateDoc } from "firebase/firestore";

const colName = "test";
const newField = { contactNumber: "00-000-0000" };

const querySnapshot = await getDocs(collection(db, colName));
querySnapshot.forEach((doc) => {
    updateDoc(doc.ref, newField)
        .then(() => {
            console.log(`Done: ${doc.id}`);
        })
        .catch((error) => {
            console.log(`Error: ${doc.id}`);
        });
});

export default function DB_AddField() {
    return <div>Add Field Ran</div>;
}
