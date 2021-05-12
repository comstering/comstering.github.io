import React, { useState } from 'react'
import SudoLogin from './SudoLogin';

function CommandInput(props) {
    const [input, setInput] = useState('');
    const [inputDone, setInputDone] = useState(false);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (input === 'su') {
                setInputDone(true);
            }
            else {
                alert(`'${input}' is wrong command`);
            }
        }
    }
    const changeInput = (e) => {
        setInput(e.target.value);
    }
    const isDone = props.isDone;
    if (inputDone) {
        return (
            <div>
                <span>comstering@github.io: ~$ {input}</span>
                <SudoLogin />
            </div>
        );
    }
    else if (isDone) {
        return (
            <div>
                <span>comstering@github.io: ~$ </span>
                <input type='text' autocomplete='off' autoFocus='on' onKeyUp={handleKeyPress} onChange={changeInput} className='console' style={{ background: 'black', borderStyle: 'none', color: 'white', outline: 'none' }} />
            </div>
        );
    }
    else return <div />
}

export default CommandInput
