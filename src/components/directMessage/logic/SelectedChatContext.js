import { createContext, useReducer } from "react";

export const SelectedChat = createContext();

export const SelectedChatProvider = ({ children }) => {
    const INITIAL_STATE = {
        selectedChat: "",
    };

    const selectedChatReducer = (state, action) => {
        switch (action.type) {
            case "SET_SELECTED_CHAT":
                return { selectedChat: action.payload };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(selectedChatReducer, INITIAL_STATE);

    return (
        <SelectedChat.Provider value={{ data: state, dispatch }}>
            {children}
        </SelectedChat.Provider>
    );
};
