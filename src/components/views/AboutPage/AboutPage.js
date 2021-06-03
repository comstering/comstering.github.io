import React from 'react';
import { Jumbotron } from 'react-bootstrap';

function AbountPage() {
    return (
        <div className='mt-3'>
            <Jumbotron>
                <h4 className='about-header-font mb-3'>Education</h4>
                <div className='about-body-font'>
                    <p className='mb-1'><span className='mr-4'>2016.03 ~ ing</span><span>Kongju National University</span></p>
                </div>
            </Jumbotron>
            <Jumbotron>
                <h4 className='about-header-font mb-3'>Certification</h4>
                <div className='about-body-font'>
                    <p className='mb-1'><span className='mr-4'>2021.06</span><span>Enginner Information Processing</span></p>
                    <p className='mb-1'><span className='mr-4'>2020.10</span><span>Linux Master Level2</span></p>
                </div>
            </Jumbotron>
            <Jumbotron>
                <h4 className='about-header-font mb-3'>Activity</h4>
                <div className='about-body-font'>
                    <p className='mb-1'><span className='mr-4'>2021.01 ~ 2021.05</span><span>System Hacking Track of ProjectH4C by TeamH4C</span></p>
                    <p className='mb-1'><span className='mr-4'>2019.03 ~ ing</span><span>Kongju National University Network Security Lab</span></p>
                </div>
            </Jumbotron>
        </div>
    )
}

export default AbountPage
