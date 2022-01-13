import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { AuthContext } from "../contexts/AuthContext"


function NavbarComp() {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    {user ? (
                        <NavLink to="/myPage" className="navbar-brand">
                            My Page
                        </NavLink>
                    ) : (
                        <>
                        <NavLink to="/" className="navbar-brand">
                            Home
                        </NavLink>
                        <NavLink to="/createAcc" className="navbar-brand">
                            Create Account
                        </NavLink>
                        <NavLink to="/signIn" className="navbar-brand">
                            Sign In
                        </NavLink>
                        </>
                    )}
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComp

