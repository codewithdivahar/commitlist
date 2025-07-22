import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "@react-native-firebase/auth";
import { createContext, ReactElement, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children } : {children : ReactElement}) => {
    const [user, setUser] = useState<any>(null)
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
            console.log("Firebase user --->", firebaseUser)
            setUser(firebaseUser)
            if (authLoading) setAuthLoading(false)
        })

        return unsubscribe;
    })

    const login = (email: string, password: string) => signInWithEmailAndPassword(getAuth(), email, password);
    const signup = (email: string, password: string) => createUserWithEmailAndPassword(getAuth() ,email, password);
    const logout = () => getAuth().signOut();
    return (<AuthContext.Provider value={ {user, authLoading, login, signup, logout}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext);