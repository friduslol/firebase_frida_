import React, {useContext} from 'react'
import { AuthContext } from "../contexts/AuthContext"
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { collection, query, where } from 'firebase/firestore'
import { fireStore } from '../firebase'
import { useFirestoreQueryData } from "@react-query-firebase/firestore"
import { Link } from "react-router-dom"

const Albums = () => {
    const { user } = useContext(AuthContext)

    const queryRef = query(
        collection(fireStore, "albums"),
        where("owner", "==", user.uid)
    )
    const { data, isLoading } = useFirestoreQueryData(["albums"], queryRef, {
        idField: "id",
        subscribe: true,
    }, {
        refetchOnMount: "always"
    })

    return (
        <div>
            <Container>
                <h2>Albums</h2>
                {isLoading && <p>...</p>}
                {data && <>

                    {data.length ?
                    <ListGroup>
                        {data.map((album, i) => (
                            <ListGroup.Item key={i} as={Link} action to={`/album/${album.id}`}>
                                <span key={i}>{album.title}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    : <></>}

                </>}
            </Container>
        </div>
    )
}

export default Albums
