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
                        <span>I dream becommig a Full Stack Developer.</span><br />
                        <span>Programming is love.</span><br />
                        <span>I make Everything using code.</span><br />
                        <span>Thank you visit my web site.</span><br />
                    </Typist>
                    <CommandInput isDone={typistDone} />
                </div>
            </Alert>
        </div>
    );
}

export default MainPage
