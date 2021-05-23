import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import Typist from 'react-typist';
import CommandInput from './CommandInput';

function MainPage() {
    const [typistDone, setTypistDone] = useState(false);

    return (
        <div className='mt-3'>
            <Alert className='main-console'>
                <div className='console'>
                    <span>comstering@github.io: ~$ </span>
                    <Typist className='console' startDelay='1000' cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }} onTypingDone={() => setTypistDone(true)}>
                        <span>whoami</span> <br />
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
        </div>
    );
}

export default MainPage
