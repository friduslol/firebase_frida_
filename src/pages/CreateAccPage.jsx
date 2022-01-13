import React, { useRef, useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
// import Container from 'react-bootstrap/Container'
import Card from "react-bootstrap/Card"
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function CreateAccPage() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { createAcc } = useContext(AuthContext)
    const navigate = useNavigate()
    const [submit, setSubmit] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            alert("Passwords dosen't match, try again!")
        }
        try {
            setSubmit(true)
            await createAcc(emailRef.current.value, passwordRef.current.value)
            navigate("/myPage")

        } catch(e) {
            alert("An error occurred, please try again!")
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
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control ref={confirmPasswordRef} type="password" placeholder="Password" required/>
                        </Form.Group>

                        <Button disabled={submit} onClick={handleSubmit} variant="primary" type="submit">
                            Create account
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CreateAccPage
