import React, {useContext} from 'react'
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

function RequireAuth(props) {
    const { user } = useContext(AuthContext)

    return (
        user ? props.children : <Navigate to={props.redirectTo} />
    )
}

export default RequireAuth
