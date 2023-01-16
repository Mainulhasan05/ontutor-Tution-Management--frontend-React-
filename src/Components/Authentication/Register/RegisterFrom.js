import React, { useState } from 'react'
import { Button,Form } from 'react-bootstrap'
import district from "../../../Data/districts.json"
import axios from 'axios'
import URL from '../../URL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword,sendEmailVerification } from 'firebase/auth'
import { auth } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
const RegisterFrom = () => {
  const navigate=useNavigate()
  const district_data=district[2].data
  const [obj, setObj] = useState({
    name:"",
    email:"",
    phone:"",
    salary:"",
    area:[],
    district:"Dhaka",
    password:"",
    degree:"",
    institution:"",
    passing_year:"",
    result:"",
    hobbies:"",
    experience:""
  })
  const updateUpzila=(e)=>{
    const id=e.target.value.split("-")[0]
    const name=e.target.value.split("-")[1]
    setObj({...obj,['district']:name})
  }


  const handleChange=(e)=>{
    setObj({...obj,[e.target.name]:e.target.value})
    // console.log(obj)
  }
  const handleSubmit=async()=>{
    
      if(obj.email && obj.name && obj.password.length>5 && obj.phone){
        try {
        await createUserWithEmailAndPassword(auth,obj.email,obj.password)
        .then(userCredential=>{
          toast.success('Account Created Successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            // axios.post(`${URL}/register`,obj)
            // .then(res=>{

            // })
              fetch(`${URL}/register`, {
              method: 'POST',
              mode: 'cors',
              headers:{
                "ngrok-skip-browser-warning":false,
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(obj)
          })
          .then(response => response.json())
          .then(data =>{
          })
          .catch(error => alert("An error occured"));
          
            sendEmailVerification(userCredential.user)
            .then(res=>{
              
            })
            setTimeout(()=>{
              toast.info('Please Check your SPAM folder in Email to verify', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            },3000)
        })  

      } catch (error) {
        toast.warn('Email already in use!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      }
      
    
    
    // .then(res=>{
    //   console.log(res)
    // })
  }
  return (
    <div>
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
      <Form.Group className="mb-3">
        <Form.Label>Enter full name</Form.Label>
        <Form.Control onChange={handleChange} name='name' type="text" placeholder="Enter full name" />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Enter Email <small className='text-info'>(You need to verify email)</small> </Form.Label>
        <Form.Control onChange={handleChange} name='email' type="email" placeholder="Enter email" />
      </Form.Group>
      

      <Form.Group className='mb-3'>
        <Form.Label>Phone number</Form.Label>
        <Form.Control onChange={handleChange} name='phone' type="phone" placeholder="Enter phone" />
      </Form.Group>

      <Form.Select  onChange={updateUpzila}>
            
            {district_data.map((data,index)=>{
              return(
              <option key={index} value={data.id+"-"+data.name}>{data.name}</option>
              )              
            })}
      </Form.Select>

      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleChange} name='password' type="password" placeholder="Enter password" />
      </Form.Group>
      <div className="d-grid">
      <Button onClick={handleSubmit} variant="success">Register</Button>
      </div>
      

    </div>
  )
}

export default RegisterFrom