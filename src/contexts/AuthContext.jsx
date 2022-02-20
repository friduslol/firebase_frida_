import React, { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword
    } from "firebase/auth"
import { auth } from "../firebase"

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [confirm, setConfirm] = useState(true)

    const createAcc = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
            setConfirm(false)
        })
        // eslint-disable-next-line
    }, [])

    const values = {
        createAcc,
        user,
        logOut,
        logIn
    }

    return(
        <AuthContext.Provider value={values}>
            {!confirm && props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider