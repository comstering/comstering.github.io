import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Comstering</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/about'>About Me</Nav.Link>
          <Nav.Link href='/project'>Project</Nav.Link>
          <Nav.Link href='/skills'>Skills</Nav.Link>
          <Nav.Link href='/contact'>Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
