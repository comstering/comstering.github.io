import { Alert } from 'react-bootstrap';
import React from 'react';
import { Container } from 'react-bootstrap';
import { FilePerson, Github, Textarea } from 'react-bootstrap-icons';
import Typist from 'react-typist';
import '../../css/fonts.css';

function MainPage() {
    const consoleStyle = { color: 'white', backgroundColor: 'black', height: '60vh', fontSize: 'x-large' }
    return (
        <Container>
            <br/>
            <Alert style={consoleStyle}>
                <Typist className='console'>
                    <span>Hi! I'm comstering</span>
                    <br />
                    <span>I'm a Engineer</span>
                    <br />

                </Typist>
            </Alert>
        </Container>
    )
}

export default MainPage
