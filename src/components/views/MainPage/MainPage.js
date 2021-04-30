import { Alert } from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import { Button, Jumbotron, Container, Form } from 'react-bootstrap'
import { FilePerson, Github } from 'react-bootstrap-icons'
import Typist from 'react-typist'

function MainPage() {
    const consoleStyle={color: 'white', backgroundColor: 'black', height: '60vh', fontSize: 'x-large'}
    return (
        <Container>
            <Alert style={consoleStyle}>
                <Typist>
                    <span>Hi My name is comstering</span>
                    <br />
                    <span>I'm Engineer</span>
                </Typist>
            </Alert>
        </Container>
    )
}

export default MainPage
