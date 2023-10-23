import { createContext, useReducer } from "react";

export const SelectedChat = createContext();

export const SelectedChatProvider = ({ children }) => {
    const INITIAL_STATE = {
        selectedChat: null,
        message: "",
    };

    const selectedChatReducer = (state, action) => {
        switch (action.type) {
            case "SET_SELECTED_CHAT":
                return { ...state, selectedChat: action.payload };

            case "SET_MESSAGE":
                return { ...state, message: action.payload };

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
