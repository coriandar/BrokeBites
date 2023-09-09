import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
} from "react";
import { auth } from "../components/firebase/FirebaseApp";

type Props = {
    children: ReactNode;
};

type authContextType = {
    user: boolean | null;
    // login: () => void;
    // logout: () => void;
};

const authContextDefault: authContextType = {
    user: null,
    // login: () => {},
    // logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefault);
const fbAuth = auth;

export function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<boolean | null>(null); // default as null

    // const login = () => {
    //     setUser(true);
    // };

    // const logout = () => {
    //     fbAuth.signOut();
    // };

    useEffect(() => {
        const unregisterAuthObserver = fbAuth.onAuthStateChanged((user) => {
            setUser(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ user }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export const UserAuthContext = () => {
    return useContext(AuthContext);
};
