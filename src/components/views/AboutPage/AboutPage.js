import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import { Github, Youtube } from 'react-bootstrap-icons';

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
                    <p className='mb-1'><span className='mr-4'>2021.05</span><span>Enginner Information Processing</span></p>
                </div>
            </Jumbotron>
            <Jumbotron>
                <h4 className='about_header mb-3'>Activity</h4>
                <div className='about_body'>
                    <p className='mb-1'><span className='mr-4'>2021.01 ~ 2021.05</span><span>System Hacking Track of ProjectH4C by TeamH4C</span></p>
                    <p className='mb-1'><span className='mr-4'>2019.03 ~ ing</span><span>Kongju National University Network Security Lab</span></p>
                </div>
            </Jumbotron>
            <a href='https://github.com/comstering'><Github className='mr-3 about_icon' size={40} /></a>
            {/* <Instagram className='mr-3' size={40} /> */}
            <a href='https://www.youtube.com/channel/UCcAj91sfvJ9aCHpkisdyIww'><Youtube className='mr-3 about_icon' size={40} /></a>
            <a href='https://blog.naver.com/coms1101'><img src='/images/blog.png' width='40' height='40'></img></a>
        </Container>
    )
}

export default AbountPage
