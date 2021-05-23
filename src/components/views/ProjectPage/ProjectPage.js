import React from 'react'
import { Image } from 'react-bootstrap'

function ProjectPage() {
    return (
        <div className='project-body'>
        <div className='project-box fadeIn ftco-animated'>
            <Image src='/images/IMCP.png' width='40%' height='auto' rounded/>
            <div className='p-4'>
                <h3 className='project-title-font mb-3'>Missing Child Prevention System</h3>
                <p className='project-date-font'>May 11, 2020 ~ Oct 23, 2020</p>
                <p className='project-body-font mb-4'>아이 GPS 위치 데이터를 이용한 위험상황 알림 프로젝트</p>
                <p className='project-read'><a href='https://github.com/comstering/IMCP' target='_blank' rel='noopener noreferrer'>Read more <span class='icon-font ion-ios-arrow-forward' /></a> IMCP</p>
            </div>
        </div>
        <div className='project-box fadeIn ftco-animated'>
            <Image src='/images/IoTOffice.jpg' width='40%' height='auto' rounded/>
            <div className='p-4'>
                <h3 className='project-title-font mb-3'>IoT Office</h3>
                <p className='project-date-font'>Nov 25, 2019 ~ Mar 19, 2020</p>
                <p className='project-body-font mb-4'>Arduino를 이용한 사무실 내 기기 조작 및 사무용품 데이터 자동 연동 환경 구축</p>
                <p className='project-read'><a href='https://github.com/comstering/Lab_IoT_Arduino' target='_blank' rel='noopener noreferrer'>Read more <span class='icon-font ion-ios-arrow-forward' /></a> IoT Arduino</p>
                <p className='project-read'><a href='https://github.com/comstering/Lab_IoT_Arduino_Server' target='_blank' rel='noopener noreferrer'>Read more <span class='icon-font ion-ios-arrow-forward' /></a> IoT Server</p>
            </div>
        </div>
        <div className='project-box fadeIn ftco-animated'>
            <Image src='/images/RandomPassword.jpg' width='40%' height='auto' rounded/>
            <div className='p-4'>
                <h3 className='project-title-font mb-3'>Random Password</h3>
                <p className='project-date-font'>Sep 25, 2019 ~ Nov 29, 2019</p>
                <p className='project-body-font mb-4'>사용자의 개인정보 보호를 위한 모바일 기반 비밀번호 자동변환 시스템</p>
                <p className='project-read'><a href='https://github.com/comstering/RandomPassword' target='_blank' rel='noopener noreferrer'>Read more <span class='icon-font ion-ios-arrow-forward' /></a> Random Password</p>
                <p className='project-read'><a href='https://github.com/comstering/RandomPassword_Server' target='_blank' rel='noopener noreferrer'>Read more <span class='icon-font ion-ios-arrow-forward' /></a> Random Password Server</p>
            </div>
        </div>
        </div>
    )
}

export default ProjectPage
