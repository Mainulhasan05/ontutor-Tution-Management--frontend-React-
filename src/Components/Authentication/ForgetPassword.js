import React, { useState } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase';
import { async } from '@firebase/util';

const ForgetPassword = () => {
    const [email, setEmail] = useState("")
    const sendEmail=async()=>{
        if(email){
            await sendPasswordResetEmail(auth,email)
            .then((data)=>{
                alert("Password Reset Email Sent.")
            })
        }
    }
  return (
    <div>
        <div className="container my-4">
            <div className="d-flex justify-content-center align-items-center w-100">
                <div className="card my-3 p-3">
                <br />
                    <h5 className="text-center mb-1">Forget Password</h5>
                    <input onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control my-2"  placeholder='Enter Email'/>
                    <button onClick={sendEmail} className='btn btn-info'>Send Password Reset Link</button>
                    <br />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword