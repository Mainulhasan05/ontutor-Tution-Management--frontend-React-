import React from 'react'
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
const Navbar1 = () => {
    
  return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand><Link className='links' to="/">ontutors</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                <Nav.Item className='mx-3'><Link className='links' to="/">HOME</Link></Nav.Item>
                <Nav.Item className='mx-3'><Link className='links' to="/search_tutors">SEARCH TUTORS</Link></Nav.Item>
                <Nav.Item className='mx-3'><Link className='links' to="/request_tutor">REQUEST FOR A TUTOR</Link></Nav.Item>
                <Nav.Item className='mx-3'><Link className='links' to="/verified_tutors">VERIFIED TUTORS</Link></Nav.Item>
                </Nav>
<br />
                <Nav className='ms-auto'>
                <Nav.Item className='mx-3 btn btn-success'><Link className='links' to="/login">LOGIN</Link></Nav.Item>
                <Nav.Item className='mx-3'><b>Or</b></Nav.Item>
                <Nav.Item className='mx-3 btn btn-info'><Link className='links' to="/register">RGISTER</Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navbar1
