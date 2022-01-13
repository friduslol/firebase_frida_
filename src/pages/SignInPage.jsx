import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
// import Container from 'react-bootstrap/Container'
import Card from "react-bootstrap/Card"
import { useRef, useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function SignInPage() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { logIn } = useContext(AuthContext)
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setSubmit(true)
            await logIn(emailRef.current.value, passwordRef.current.value)
            navigate("/myPage")
        } catch (e) {
            alert("error!")
            setSubmit(false)
        }
    }

    return (
        <div>
            <Card style={{ "maxWidth": '35rem' }} className="mx-auto">
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button disabled={submit} onClick={handleSubmit} variant="primary" type="submit">
                            Sign in
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SignInPage
