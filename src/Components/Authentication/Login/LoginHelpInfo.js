import React from 'react'
import { Card } from 'react-bootstrap'
const LoginHelpInfo = () => {
  return (
    <div className='p-2 my-3'>
        <Card.Title>Help & Info</Card.Title>
        <hr />  
        <Card.Text className='text-danger'>Q. What if you are registered but cannot login?</Card.Text>
        <Card.Text className='text-success'>Ans: Please check your email if you verified it or not.</Card.Text>
        <br />
        <Card.Text className='text-danger'>Q. Did not get the verification email?</Card.Text>
        <Card.Text className='text-success'>Ans: Please check your spam mail.</Card.Text>
    </div>
  )
}

export default LoginHelpInfo