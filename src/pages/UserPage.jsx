import React, {useContext} from 'react'
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import CreateAlbum from "../components/CreateAlbum"
import Albums from "../components/Albums"

function UserPage() {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)

    const handeLogOut = async () => {
        await logOut()
		navigate('/')
    }

    return (
        <Container>
            <Button onClick={handeLogOut} variant="primary" type="submit">
                Log out
            </Button>
            <CreateAlbum />
            <Albums />
        </Container>
    )
}

export default UserPage
