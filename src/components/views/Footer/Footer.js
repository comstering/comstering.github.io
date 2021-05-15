import React from 'react'
import { Github, Youtube } from 'react-bootstrap-icons';

function Footer() {
    return (
        <footer style={{textAlign: 'center'}}>
            <hr />
            <h3 className='nav-font'>Go to My record</h3>
            <a href='https://github.com/comstering'><Github className='mr-5 footer-icon' size={40} /></a>
            {/* <Instagram className='mr-3' size={40} /> */}
            <a href='https://www.youtube.com/channel/UCcAj91sfvJ9aCHpkisdyIww'><Youtube className='mr-5 footer-icon' size={40} /></a>
            <a href='https://blog.naver.com/coms1101'><img src='/images/blog.png' width='40' height='40'></img></a>
            <hr />
        </footer>
    )
}

export default Footer