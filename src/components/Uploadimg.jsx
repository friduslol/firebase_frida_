import React, {useContext, useState, useRef } from 'react'
import { doc, arrayUnion, updateDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { fireStore, storage } from "../firebase"
import { AuthContext } from "../contexts/AuthContext"
import { useParams } from "react-router-dom"
import { Form, Button, Card } from "react-bootstrap"

const UploadImg = () => {
    const { user  } = useContext(AuthContext)
    const { id } = useParams()
    const inputRef = useRef()
    const [img, setImg] = useState(null)
    const [submit, setSubmit] = useState(false)

    const onFileChange = (e) => {
        if (e.target.files[0]) {
			setImg(e.target.files[0])
		}
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)
        if(!img) {
            return
        }

        //create unique name
        const storageName = `${Date.now()}-${img.name}`

        //create reference to file in storage
        const fileRef = ref(storage, `images/${user.uid}/${storageName}`)

        try {
            //create reference to storage
            const storageRef = ref(storage, fileRef)

            //start adding file
            const upload = uploadBytesResumable(storageRef, img)

            //wait for upload to finish
            await upload.then()

            //get download url to uploaded img
            const url = await getDownloadURL(storageRef)

            //updating doc with new field, array of images
            //creating obj with url and storage referecne
            await updateDoc(doc(fireStore, "albums", id), {
                images: arrayUnion({
                    storageRef: storageRef.fullPath,
                    url: url
                })
            })
            setSubmit(false)
            inputRef.current.value = ""

        } catch (e) {
            alert("error!")
            setSubmit(false)
        }
    }

    return (
        <Card style={{ "maxWidth": '35rem' }} className="mx-auto">
            <Card.Body>
                <Card.Title>
                    Add new image to this album
                </Card.Title>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={onFileChange} ref={inputRef} required/>
                        <Button disabled={submit} variant="primary" type="submit">Upload Image</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}
export default UploadImg


