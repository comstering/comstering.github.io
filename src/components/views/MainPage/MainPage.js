import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Typist from 'react-typist';
import CommandInput from './CommandInput';

function MainPage() {
    const consoleStyle = { color: 'white', backgroundColor: 'black', height: '60vh', fontSize: 'x-large' }

    const [typistDone, setTypistDone] = useState(false);

    return (
        <Container className='mt-3'>
            <Alert style={consoleStyle}>
                <div className='console'>
                    <span>comstering@github.io: ~$ </span>
                    <Typist className='console' startDelay='1000' cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }} onTypingDone={() => setTypistDone(true)}>
                        <span>whoami</span><br />
                        <span>Hi!</span><br />
                        <span>I'm comstering.</span><br />
                        <span>I'm a Full Stack Engineer.</span><br />
                        <span>I love Programming</span><br />
                        <span>I make Everything use Coding</span><br />
                        <span>Can you login sudo?</span>
                    </Typist>
                    <CommandInput isDone={typistDone} />
                </div>
            </Alert>
        </Container>
    );
}

export default MainPage
