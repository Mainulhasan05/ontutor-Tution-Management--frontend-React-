import React from 'react'
import { Button,Form } from 'react-bootstrap'
import district from "../../../Data/districts.json"
const RegisterFrom = () => {
  const district_data=district[2].data
  const updateUpzila=(e)=>{
    const id=e.target.value.split("-")[0]
    const name=e.target.value.split("-")[1]
    
  }
  return (
    <div>
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>Enter full name</Form.Label>
        <Form.Control name='name' type="text" placeholder="Enter full name" />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Enter Email <small className='text-info'>(You need to verify email)</small> </Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" />
      </Form.Group>
      

      <Form.Group className='mb-3'>
        <Form.Label>Phone number</Form.Label>
        <Form.Control name='phone' type="phone" placeholder="Enter phone" />
      </Form.Group>

      <Form.Select onChange={updateUpzila}>
            <option value="">All Districts</option>
            {district_data.map((data,index)=>{
              return(
              <option key={index} value={data.id+"-"+data.bn_name}>{data.bn_name}</option>
              )              
            })}
      </Form.Select>

      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Enter password" />
      </Form.Group>
      <div className="d-grid">
      <Button variant="success">Register</Button>
      </div>
      

      </Form>
    </div>
  )
}

export default RegisterFrom