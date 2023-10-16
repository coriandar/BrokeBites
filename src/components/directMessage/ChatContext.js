import { auth } from "@/database/firebase/firebaseApp";
import { createContext, useReducer } from "react";

// Context: to share the data that can be considered 'global'.
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const currentUser = auth.currentUser;

    // Inital state for chatReducer
    const INITIAL_STATE = {
        chatID: "null",
        user: {},
    };

    // Reducer: similar to useState, but more effective when trying to update multiple variables' state at once.
    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatID:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};
