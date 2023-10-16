import { auth } from "@/database/firebase/firebaseApp";
import { createContext, useReducer } from "react";

// Context: to share the data that can be considered 'global'.
export const DMContext = createContext();

export const DMContextProvider = ({ children }) => {
    const currentUser = auth.currentUser;

    // Inital state for DMReducer
    const INITIAL_STATE = {
        chatID: "null",
        user: {},
    };

    // Reducer: similar to useState, but more effective when trying to update multiple variables' state at once.
    const DMReducer = (state, action) => {
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

    const [state, dispatch] = useReducer(DMReducer, INITIAL_STATE);

    return (
        <DMContext.Provider value={{ data: state, dispatch }}>
            {children}
        </DMContext.Provider>
    );
};
