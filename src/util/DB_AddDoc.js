import { db } from "@/database/firebase/firebaseApp";
import { doc, setDoc } from "firebase/firestore";
import dataSet from "./1010_cleaned.json";

for (let data of dataSet) {
    const id = data.id;
    await setDoc(doc(db, "testDB", id), data);
}

export default function DB_AddDoc() {
    return <div>Run DB_AddDoc</div>;
}
