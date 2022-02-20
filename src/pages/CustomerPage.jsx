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
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        if(album) {
            if(album.images.length) {
                setImgArr(album.images)
            }
        }
    },[album])

    const addImg = (image, index) => {
       if(customerArr.includes(image)) {
            return
       } else if (removedArr.includes(image)) {
            setRemovedArr(
                removedArr.filter((prevImage) => prevImage.storageRef !== image.storageRef)
            )
            setCustomerArr((prevState) => [image, ...prevState])
            myRefs.current[index].classList.remove("remove");
            myRefs.current[index].classList.add("add")
        } else {
            setCustomerArr((prevState) => [image, ...prevState])
            myRefs.current[index].classList.add("add")
        }
    }

    const removeImg = (image, index) => {
        if(removedArr.includes(image)) {
            return
        } else if (customerArr.includes(image)) {
            setCustomerArr(
                customerArr.filter((prevImage) => prevImage.storageRef !== image.storageRef)
            )
            setRemovedArr((prevState) => [image, ...prevState])
            myRefs.current[index].classList.remove("add");
            myRefs.current[index].classList.add("remove")
        }
        else {
            setRemovedArr((prevState) => [image, ...prevState])
            myRefs.current[index].classList.add("remove");
        }
    }

    const onCreateCopy = async () => {
        let count = removedArr.length + customerArr.length
        if(count !== imgArr.length) {
            alert(`You have only made a decision on ${count} / ${imgArr.length} images, please resume!`)
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
            <p> {customerArr.length} / {imgArr.length} images chosen!</p>
            <div className="btn-wrapper">
                <Button className="btn" disabled={submit} onClick={onCreateCopy}>Submit album</Button>
            </div>
        </SRLWrapper>
    )
}

export default CustomerPage
