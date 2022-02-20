import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import useGetAlbum from "../hooks/useGetAlbum"
import { addDoc, collection } from 'firebase/firestore'
import { fireStore } from '../firebase'
import { SRLWrapper } from "simple-react-lightbox"
import Masonry from "react-masonry-css"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const masonryBreakpoints = {
	default: 4,
	576: 2,
	768: 3,
	992: 4,
}

const CustomerPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { userId } = useParams()
    const { loading, data: album } = useGetAlbum(id)
    const myRefs= useRef([]);
    const [imgArr, setImgArr] = useState([])
    const [customerArr, setCustomerArr] = useState([])
    const [removedArr, setRemovedArr] = useState([])
    const [count, setCount] = useState(0)
    const [submit, setSubmit] = useState(false)
    useEffect(() => {
        if(album) {
            if(album.images.length) {
            setImgArr(album.images)
            }
        }
    },[album])

    useEffect(() => {
        console.log("customerArr", customerArr)
    },[customerArr])

    useEffect(() => {
       console.log("removedArr", removedArr)
    },[removedArr])

    const addImg = (image, index) => {
       if(customerArr.includes(image) || removedArr.includes(image)) {
            return
       } else {
        setCustomerArr((prevState) => [image, ...prevState])
        setCount((prevState) => prevState += 1)
        myRefs.current[index].classList.add("add")
       }

    }

    const removeImg = (image, index) => {
        if(customerArr.includes(image) || removedArr.includes(image)) {
            return
        } else {
            setRemovedArr((prevState) => [image, ...prevState])
            setCount((prevState) => prevState += 1)
            myRefs.current[index].classList.add("remove");
        }
    }

    const onCreateCopy = async () => {
        if(count !== imgArr.length) {
            return
        }

        setSubmit(true)
        await addDoc(collection(fireStore, "albums"), {
            title: "cutomer album",
            owner: userId,
            images: customerArr
        })
        setCustomerArr([])
        setSubmit(false)
        navigate("/msgPage")
    }

    const onReset = () => {
        setCustomerArr([])
        setRemovedArr([])
        setCount(0)
    }

    return (
        <SRLWrapper>
            {loading && <>...</>}
            <Masonry
                breakpointCols={masonryBreakpoints}
                className="memes-masonry"
                columnClassName="memes-masonry-column"
            >
                {!imgArr && <p>No Images!</p>}
                {imgArr && imgArr.map((image, index)=> (
                <Card className="card" key={index} ref={(el) => (myRefs.current[index] = el)}>
                    <a href={image.url}>
                        <Card.Img variant="top" src={image.url} title={image._id} />
                    </a>
                    <Card.Footer className="card-footer">
                        <FontAwesomeIcon icon={faThumbsDown} onClick={() => removeImg(image, index)}
                        role="button"/>
                        <FontAwesomeIcon icon={faThumbsUp} onClick={() => addImg(image, index)}
                        role="button"/>
                    </Card.Footer>
                </Card>
                ))}
            </Masonry >
            <div className="btn-wrapper">
                <Button className="btn" onClick={onReset}>Start over!</Button>
                <Button className="btn" disabled={submit} onClick={onCreateCopy}>Submit album</Button>
            </div>
        </SRLWrapper>
    )
}

export default CustomerPage
