import React, { useState }from 'react'

function SudoLogin() {
    const [input, setInput] = useState('');
    const [sudo, setSudo] = useState(false);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (input === 'security') {
                setSudo(true);
            }
            else {
                alert(`Login Fail`);
            }
        }
    }
    
    const changeInput = (e) => {
        setInput(e.target.value);
    }
    if(sudo) {
        return (
            <div>
                <span>Password: </span>
                <br/>
                <span>Are You Hacker???</span>
            </div>
        )
    }
    else {
    return (
        <div>
            <span>Password: </span>
            <input type='text' autocomplete='off' autoFocus='on' spellCheck={false} className='console-password' onKeyUp={handleKeyPress} onChange={changeInput} />
        </div>
    )
    }
}

export default SudoLogin
