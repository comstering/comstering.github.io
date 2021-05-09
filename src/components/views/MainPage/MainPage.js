import { Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Typist from 'react-typist';
import '../../css/fonts.css';
import '../../css/style.css';

function CommandLine(props) {
    const isDone = props.isDone;
    if(isDone){
        return (
            <div>
            <span>comstering@githyb.io: ~$ </span>
            <input type='text' autocomplete='off' autoFocus='on' id='commandInput' className='console' style={{background: 'black', borderStyle: 'none', color: 'white', outline: 'none'}} />
            </div>
        )
    }
    else return <div></div>
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
                    <span>I'm a Engineer</span>
                </Typist>
                <CommandLine isDone={typistDone} />
            </Alert>
        </Container>
    );
}

export default MainPage
