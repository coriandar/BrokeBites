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
};

const authContextDefault: authContextType = {
    user: null,
};

const AuthContext = createContext<authContextType>(authContextDefault);

export function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<boolean | null>(null); // default as null

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
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
