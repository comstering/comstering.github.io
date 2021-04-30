import React from 'react'
import { Button, Jumbotron, Container, Form } from 'react-bootstrap'

function MainPage() {
    return (
        <Container>
            <Jumbotron variant='dark'>
                <p>
                    Hi My name is qqq
                </p>
            </Jumbotron>
            <Form.Control variant='dark' as='textarea' rows={3} />
            <Button variant='dark' size='xl'>Flat</Button>
        </Container>
    )   
}

export default MainPage
