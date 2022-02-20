import React, { useRef, useState } from 'react'
import { useParams } from "react-router-dom"
import { updateDoc, doc } from "firebase/firestore"
import { fireStore } from "../firebase"
import { Form, Button, Card } from "react-bootstrap"

const ChangeAlbumName = ({ album }) => {
    const { id } = useParams()
    const inputTitleChange = useRef()
    const [submit, setSubmit] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()

        if(!inputTitleChange.current.value.length) {
            return
        }

        try {
            setSubmit(true)
            await updateDoc(doc(fireStore, "albums", id), {
                title: inputTitleChange.current.value
             })

            inputTitleChange.current.value = ""
            setSubmit(false)
        } catch (e) {
            alert("error!")
            setSubmit(false)
        }
    }

    return (
        <Card style={{ "maxWidth": '35rem' }} className="mx-auto">
            <Card.Body>
                <Card.Title>
                    Change Album Title
                </Card.Title>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            ref={inputTitleChange}
                            defaultValue={album ? album.title : ""}
                            required
                        />
                        <Button disabled={submit} variant="primary" type="submit">Update title</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default ChangeAlbumName
