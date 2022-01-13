import React, { useEffect, useState } from 'react'
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

    const addImg = (image) => {
       if(customerArr.includes(image) || removedArr.includes(image)) {
            return
       } else {
        setCustomerArr((prevState) => [image, ...prevState])
        setCount((prevState) => prevState += 1)
       }

    }

    const removeImg = (image) => {
        if(customerArr.includes(image) || removedArr.includes(image)) {
            return
        } else {
            setRemovedArr((prevState) => [image, ...prevState])
            setCount((prevState) => prevState += 1)
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
                <Card className="card" key={index}>
                    <a href={image.url}>
                        <Card.Img variant="top" src={image.url} title={image._id} />
                    </a>
                    <Card.Footer className="card-footer">
                        <FontAwesomeIcon icon={faThumbsDown} onClick={() => addImg(image)} role="button"/>
                        <FontAwesomeIcon icon={faThumbsUp} onClick={() => removeImg(image)} role="button"/>
                    </Card.Footer>
                </Card>
                ))}
            </Masonry >
            <div className="mx-auto customerImgWrapper">
                <div className="img-wrapper">
                    <p>{count} / {imgArr.length} Chosen images:</p>
                    {customerArr.map((image, index) => (
                        <img style={{ "maxWidth": '5rem' }} key={index} src={image.url} alt="chosen" />
                    ))}
                </div>
                <div className="img-wrapper">
                    <p>Removed images:</p>
                    {removedArr.map((image, index) => (
                        <img style={{ "maxWidth": '5rem' }} key={index} src={image.url} alt="removed" />
                    ))}
                </div>
            </div>
            <div className="btn-wrapper">
                <Button className="btn" onClick={onReset}>Start over!</Button>
                <Button className="btn" disabled={submit} onClick={onCreateCopy}>Submit album</Button>
            </div>
        </SRLWrapper>
    )
}

export default CustomerPage
