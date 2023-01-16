import React, { useState } from 'react'
import { Container,Alert } from 'react-bootstrap'
import RegisterFrom from './RegisterFrom'

const Register = () => {
  
  return (
    <Container className='my-3'>
      <Alert variant='info'><h4>Register</h4></Alert>

      <div className="row">
        <div className="col-md-6 mx-1">
          <RegisterFrom/>
        </div>
        <div className="col-md-4 mx-2">
          Help
        </div>
      </div>
    </Container>
  )
}

export default Register