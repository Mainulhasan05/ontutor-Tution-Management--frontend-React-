import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap'
import { signInWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { auth } from '../../../firebase';

const LoginForm = () => {
  const [auth1, setAuth] = useState({
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    setAuth({...auth1,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
      e.preventDefault()
      await auth.signOut()
      // await signInWithEmailAndPassword(auth,auth1.email,auth1.password)
      // .then((res)=>{
      //   console.log(res)
      // })
  }
  return (
    <div className='my-3'>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' onChange={(e)=>handleChange(e)} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' onChange={(e)=>handleChange(e)} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Button onClick={handleSubmit} variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </div>
  )
}

export default LoginForm