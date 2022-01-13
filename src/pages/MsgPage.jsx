import React from 'react'
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert"

const MsgPage = () => {
    return (
        <Container>
            <Alert
                variant="success"
                style={{ "marginTop": '10rem', "maxWidth": "25rem" }}
                className="mx-auto"
            >
                <Alert.Heading>Album submited!</Alert.Heading>
                </Alert>
        </Container>
    )
}

export default MsgPage
