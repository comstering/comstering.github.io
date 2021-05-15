import React from 'react'
import { Image } from 'react-bootstrap'

function ProjectPage() {
    return (
        <div className='project-body'>
        <div className='project-box fadeIn ftco-animated'>
            <Image src='/images/IMCP.png' width='40%' height='auto' rounded/>
            <div className='p-4'>
                <h3>Random Password</h3>
                <p>Sep 25, 2019 ~ Nov 29, 2019</p>
                <span>랜덤패스워드입니다. 모바일기반으로 패스워드를 바꿔줍니다.</span>
            </div>
        </div>
        <div className='project-box fadeIn ftco-animated'>
            <Image src='/images/RandomPassword.jpg' width='40%' height='auto' rounded/>
            <div className='p-4'>
                <h3>Random Password</h3>
                <p>Sep 25, 2019 ~ Nov 29, 2019</p>
                <span>랜덤패스워드입니다. 모바일기반으로 패스워드를 바꿔줍니다.</span>
            </div>
        </div>
        </div>
    )
}

export default ProjectPage
