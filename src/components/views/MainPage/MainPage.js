import { Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FilePerson, Github, Textarea } from 'react-bootstrap-icons';
import Typist from 'react-typist';
import '../../css/fonts.css';
import '../../css/style.css';

function cmdInput() {
    var command = document.getElementById('commandInput');
    command.addEventListener('keyup', (e) => {
        console.log(e.key);
    });
}

{/* <input type='text' autocomplete='off' autoFocus='on' onKeyDownn={} id='commandInput' className='console' style={{background: 'black', borderStyle: 'none', color: 'white', outline: 'none'}} /> */}


function commandLine() {
        return <span>comstering@github.io</span>
}

function MainPage() {
    const consoleStyle = { color: 'white', backgroundColor: 'black', height: '60vh', fontSize: 'x-large' }

    const [typistDone, setTypistDone] = useState(false);

    useEffect(() => {
    });

    return (
        <Container>
            <br/>
            <Alert style={consoleStyle}>
                <span>comstering@github.io: ~$ </span>
                <Typist className='console' startDelay='1000' cursor={{hideWhenDone: true, hideWhenDoneDelay: 100}} onTypingDone={() => setTypistDone(true)}>
                    <span>whoami</span>
                    <br />
                    <span>Hi! I'm comstering</span>
                    <br />
                    <p>I'm a Engineer</p>
                </Typist>
                <commandLine />
            </Alert>
        </Container>
    );
}

export default MainPage
