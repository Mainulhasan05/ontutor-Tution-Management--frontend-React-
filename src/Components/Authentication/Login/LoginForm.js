import React, { useContext, useEffect, useState } from 'react'
import { Form,Button } from 'react-bootstrap'
import { signInWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import URL from '../../URL';
import axios from 'axios';
import { UserContext } from '../../../App';
const LoginForm = () => {
  const {updateUser}=useContext(UserContext)
  const navigate=useNavigate()
  const [auth1, setAuth] = useState({
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    setAuth({...auth1,[e.target.name]:e.target.value})
    
  }
  
  const handleSubmit=async(e)=>{
      e.preventDefault()
      try {
        await signInWithEmailAndPassword(auth,auth1.email,auth1.password)
      .then((UserCredentiall)=>{
        if(UserCredentiall.user.emailVerified){
          // axios.get(`${URL}/get_user`,{
          //   headers:{email:UserCredentiall.user.email}
          // }).then(res=>{
          //   updateUser(res.data)
          //   navigate("/")
          // })

            fetch(`${URL}/get_user`, {
            mode: 'cors',
            headers:{
              "ngrok-skip-browser-warning":false,
              'Content-Type': 'application/json',
              'email':UserCredentiall.user.email
            },
        })
        .then(response => response.json())
        .then(data =>{
          updateUser(data)
          navigate("/")
        })
        .catch(error => alert("An error occured"));
          // navigate("/")
        }
        else{
          toast.warn('Please verify your email! Check Spam folder', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          auth.signOut()
        }
      })
      } catch (error) {
        if(error.message.toLowerCase().includes('wrong')){
          toast.warn('Invalid Login!', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      }
      
  }
  return (
    <div className='my-3'>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
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