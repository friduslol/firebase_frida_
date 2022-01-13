import React, { useRef, useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { AuthContext } from "../contexts/AuthContext"
import { addDoc, collection } from 'firebase/firestore'
import { fireStore } from '../firebase'

function CreateAlbum() {
    const inputTitle = useRef()
    const { user } = useContext(AuthContext)
    const [submit, setSubmit] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!inputTitle.current.value.length) {
            return
        }

        setSubmit(true)

        await addDoc(collection(fireStore, "albums"), {
            title: inputTitle.current.value,
            owner: user.uid,
            images: []
        })

        inputTitle.current.value = ""
        setSubmit(false)
    }

    return (
        <div>
            <Card style={{ "maxWidth": '35rem' }} className="mx-auto">
            <h2>Create Album</h2>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Album Title</Form.Label>
                            <Form.Control type="text" ref={inputTitle} required />
                        </Form.Group>
                        <Button disabled={submit} onClick={handleSubmit} variant="primary" type="submit">
                            Create album
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CreateAlbum
