import React from 'react'
import { Card } from 'react-bootstrap'

function ContactPage() {
    return (
        <Card className="text-center mt-5 mb-5" bg='dark'>
    <Card.Body>
      <Card.Title><h1 class='contact-title-font'>Comstering</h1></Card.Title>
      <Card.Text class='contact-body-font'>Position: Developer</Card.Text>
      <Card.Text class='contact-body-font'>Email: coms1101@naver.com</Card.Text>
      <Card.Text class='contact-body-font'>Phone: 010-0000-0000</Card.Text>
    </Card.Body>
  </Card>
    )
}

export default ContactPage
