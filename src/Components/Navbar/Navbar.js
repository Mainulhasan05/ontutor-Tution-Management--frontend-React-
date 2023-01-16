import React, { useContext, useEffect, useState } from 'react'
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { Link, useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { auth } from '../../firebase'
import { async } from '@firebase/util'
import { UserContext } from '../../App'
const Navbar1 = () => {
  const {user,setUser}=useContext(UserContext)
    const [user1, setUser1] = useState("")
    const navigate=useNavigate()
    
    
    
    const handleLogout=async()=>{
      await auth.signOut()
      setUser(null)
      localStorage.removeItem("user-ontutor")
      navigate("/")
    }
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
                <Nav.Item className='mx-3'><Link className='links' to="/available_tutions">AVAILABLE TUTIONS</Link></Nav.Item>
                <Nav.Item className='mx-3'><Link className='links' to="/contactus">CONTACT</Link></Nav.Item>
                </Nav>
<br />
                {!user || user.length==0 ? 
                <Nav className='ms-auto'>
                <Nav.Item className='mx-3 btn btn-success'><Link className='links' to="/login">LOGIN</Link></Nav.Item>
                <Nav.Item className='mx-3 my-2'><b>Or</b></Nav.Item>
                <Nav.Item className='mx-3 btn btn-info'><Link className='links' to="/register">REGISTER</Link></Nav.Item>
                </Nav>:
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item my-3 mx-3">
                  <Link className='links' to="/profile1">PROFILE</Link>
                  </li>
                     <li className="nav-item my-2">
                       <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
                     </li>
                 </ul>
                </>
                
                }
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navbar1
