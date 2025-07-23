import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "@react-native-firebase/auth";
import { createContext, ReactElement, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children } : {children : ReactElement}) => {
    const [user, setUser] = useState<any>(null)
    const [authLoading, setAuthLoading] = useState(true);
    const [loginError, setLoginError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
            console.log("Firebase user --->", firebaseUser)
            setUser(firebaseUser)
            setAuthLoading(false)
        })

        return unsubscribe;
    },[])

    const login = (email: string, password: string) => signInWithEmailAndPassword(getAuth(), email, password).catch((e) => {setLoginError(e?.message); setTimeout(() => {setLoginError(null)},2000)});
    const signup = (email: string, password: string) => createUserWithEmailAndPassword(getAuth() ,email, password).catch((e) => console.log("Firebase error ---", e));
    const logout = () => getAuth().signOut();
    return (<AuthContext.Provider value={ {user, authLoading, login, signup, logout, loginError}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext);