import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { Navbar, Nav, Image } from 'react-bootstrap';

import MainPage from '../MainPage/MainPage';
import AboutPage from '../AboutPage/AboutPage';
import ProjectPage from '../ProjectPage/ProjectPage';
import SkillPage from '../SkillPage/SkillPage';
import ContactPage from '../ContactPage/ContactPage';

function returnPage(page) {
  if(page === 'home') {
    return MainPage;
  }
  else if (page ==='about') {
    return AboutPage;
  }
  else if(page === 'project') {
    return ProjectPage;
  }
  else if(page === 'skills') {
    return SkillPage;
  } else if(page === 'contact') {
    return ContactPage;
  }
}

function NavBar() {
  const [page, setPage] = useState('home')

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className='nav-cursor nav-font' onClick={() => setPage('home')}><Image src='/images/my_photo.jpg' roundedCircle width='40' height='40' /> Comstering</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setPage('home')}>Home</Nav.Link>
            <Nav.Link onClick={() => setPage('about')}>About Me</Nav.Link>
            <Nav.Link onClick={() => setPage('project')}>Project</Nav.Link>
            <Nav.Link onClick={() => setPage('skills')}>Skills</Nav.Link>
            <Nav.Link onClick={() => setPage('contact')}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Route component={returnPage(page)} />
    </Router>
  )
}

export default NavBar