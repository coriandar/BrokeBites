import { auth } from "@/database/firebase/firebaseApp";
import { getMessageList } from "@/database/firebase/firestore/direcMessageDB";
import { useContext, useEffect, useState } from "react";
import { DMContext } from "../logic/DMContext";

export default function MessageList() {
    const [messageList, setMessageList] = useState([]);
    const currentUser = auth.currentUser;

    const { dispatch } = useContext(DMContext);

    useEffect(() => {
        setMessageList(getMessageList(currentUser.uid));
    }, currentUser.uid);
}
