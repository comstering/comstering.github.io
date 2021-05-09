import { Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Typist from 'react-typist';

function CommandLine(props) {
    const [input, setInput] = useState('');
    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            console.log(input);
        }
    }
    const changeInput = (e) => {
        setInput(e.target.value);
    }
    const isDone = props.isDone;
    if (isDone) {
        return (
            <div id='cmdInput'>
                <span>comstering@github.io: ~$ </span>
                <input type='text' autocomplete='off' autoFocus='on' id='commandInput' onKeyUp={handleKeyPress} onChange={changeInput} className='console' style={{ background: 'black', borderStyle: 'none', color: 'white', outline: 'none' }} />
            </div>
        )
    }
    else return <div id='cmdInput' />
}

function MainPage() {
    const consoleStyle = { color: 'white', backgroundColor: 'black', height: '60vh', fontSize: 'x-large' }

    const [typistDone, setTypistDone] = useState(false);

    return (
        <Container className='mt-3'>
            <Alert style={consoleStyle}>
                <span>comstering@github.io: ~$ </span>
                <Typist className='console' startDelay='1000' cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }} onTypingDone={() => setTypistDone(true)}>
                    <span>whoami</span>
                    <br />
                    <span>Hi!</span>
                    <br />
                    <span>I'm comstering.</span>
                    <br />
                    <span>I'm a Full Stack Engineer.</span>
                    <br />
                    <span>I love Programming</span>
                </Typist>
                <CommandLine isDone={typistDone} />
            </Alert>
        </Container>
    );
}

export default MainPage
