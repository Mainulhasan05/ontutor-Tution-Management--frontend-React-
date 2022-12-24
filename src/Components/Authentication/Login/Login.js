import React from 'react'
import LoginHelpInfo from './LoginHelpInfo'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div className='my-4 container'>
        <div className="header alert alert-info">
            <h3>Tutor Login</h3>
        </div>

        <div className="row">
            <div className="col-md-6 shadow">
            <LoginForm/>
            </div>
            <br />
            <div className="col-md-4 ms-auto shadow-sm bg-light p-2">
                <LoginHelpInfo/>
            </div>
        </div>
        
    </div>
  )
}

export default Login