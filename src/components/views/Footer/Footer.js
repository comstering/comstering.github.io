import React from 'react'
import { Image } from 'react-bootstrap';
import { Github, Youtube } from 'react-bootstrap-icons';

function Footer() {
    return (
        <footer style={{textAlign: 'center'}}>
            <hr />
            <h3 className='nav-font'>Go to My record</h3>
            <a href='https://github.com/comstering' target='_blank' rel='noopener noreferrer'><Github className='mr-5 footer-icon' size={40} /></a>
            {/* <Instagram className='mr-3' size={40} /> */}
            <a href='https://blog.naver.com/coms1101' target='_blank' rel='noopener noreferrer'><Image src='/images/blog.png' className='mr-5' width='40' height='40' /></a>
            <a href='https://www.youtube.com/channel/UCcAj91sfvJ9aCHpkisdyIww' target='_blank' rel='noopener noreferrer'><Youtube className='footer-icon' size={40} /></a>
            <hr />
        </footer>
    )
}

export default Footer