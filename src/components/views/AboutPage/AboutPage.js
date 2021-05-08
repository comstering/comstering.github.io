import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import { Github, Instagram } from 'react-bootstrap-icons';

function AbountPage() {
    return (
        <Container className='mt-3'>
            <Jumbotron>
                <h4 className='about_header mb-3'>Education</h4>
                <div className='about_body'>
                    <p className='mb-1'><span className='mr-4'>2016.03 ~ ing</span><span>Kongju National University</span></p>
                </div>
            </Jumbotron>
            <Jumbotron>
                <h4 className='about_header mb-3'>Certification</h4>
                <div className='about_body'>
                    <p className='mb-1'><span className='mr-4'>2020.10</span><span>Linux Master Level2</span></p>
                    <p className='mb-1'><span className='mr-4'>2020.05</span><span>Enginner Information Processing</span></p>
                </div>
            </Jumbotron>
            <a href='https://github.com/comstering'><Github className='mr-3 about_icon' size='40' /></a>
            <Instagram className='mr-3' size='40'/>
        </Container>
    )
}

export default AbountPage
