import React, {useEffect, useState, useContext, useRef} from 'react'
import { useParams, useNavigate } from "react-router-dom"
import useGetAlbum from "../hooks/useGetAlbum"
import UploadImg from "./Uploadimg"
import ChangeAlbumName from "./ChangeAlbumName"
import { addDoc, collection } from "firebase/firestore"
import { fireStore } from '../firebase'
import { AuthContext } from "../contexts/AuthContext"
import { v4 as uuidv4 } from "uuid"
import { SRLWrapper } from "simple-react-lightbox"
import Masonry from "react-masonry-css"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const masonryBreakpoints = {
	default: 4,
	576: 2,
	768: 3,
	992: 4,
}

const Album = () => {
    const { id } = useParams()
    const imgRefs= useRef([]);
    const btnRefs= useRef([]);
    const { user } = useContext(AuthContext)
    const { loading, data: album } = useGetAlbum(id)
    const [imgArr, setImgArr] = useState(null)
    const [copyArr, setCopyArr] = useState([])
    const navigate = useNavigate()
    const [clickable, setClickable] = useState(false)

    useEffect(() => {
        if(album) {
            if(album.images.length) {
            setImgArr(album.images)
            }
        }
    },[album])

    const addImg = (image, i) => {
        setCopyArr((prevState) => [image, ...prevState]);
        imgRefs.current[i].classList.add("add")
        btnRefs.current[i].disabled = "true"

    }

    const onCreateCopy = async () => {
        if(!copyArr.length) {
            return
        }

        try {
            setClickable(true)
            await addDoc(collection(fireStore, "albums"), {
                title: "copy album",
                owner: user.uid,
                images: copyArr
            })
            setCopyArr(null)
            navigate("/myPage")
        } catch (e) {
            alert("error!")
            setClickable(false)
        }
    }

    const onCreate = () => {
        setClickable(false)
        const uuid = uuidv4()
        navigate(`/customer/${uuid}/${id}/${user.uid}`)
    }


    return (
        <SRLWrapper>
            {loading && <>...</>}
            {album && <p>{album.title}</p>}
        <Masonry
            breakpointCols={masonryBreakpoints}
            className="memes-masonry"
            columnClassName="memes-masonry-column"
        >
            {!imgArr && <p>No Images!</p>}
            {imgArr && imgArr.map((image, i)=> (
            <Card key={i}>
                <a href={image.url} ref={(el) => (imgRefs.current[i] = el)}>
                    <Card.Img
                        variant="top"
                        src={image.url}
                        title={image._id}
                    />
                </a>
                <Card.Footer>
                    <Button
                        onClick={() => addImg(image, i)}
                        ref={(el) => (btnRefs.current[i] = el)}
                        disabled=""
                    >Add image</Button>
                </Card.Footer>
            </Card>
            ))}
        </Masonry>
            <Card style={{ "maxWidth": '35rem' }} className="mx-auto">
                <Card.Body>
                    <Card.Header>
                        Create a copy of this album
                        <br/>
                        {copyArr && copyArr.length} Images added!
                    </Card.Header>
                    <Button disabled={clickable} onClick={onCreateCopy}>Create new album</Button>
                </Card.Body>
            </Card>
            <Card style={{ "maxWidth": '35rem' }} className="mx-auto">
                <Card.Body>
                    <Card.Header>
                        Create album-link for customer
                    </Card.Header>
                    <Button onClick={onCreate}>Create</Button>
                </Card.Body>
            </Card>
            <UploadImg />
            <ChangeAlbumName />
        </SRLWrapper>
    )
}

export default Album
