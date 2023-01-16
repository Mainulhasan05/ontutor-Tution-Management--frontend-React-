import React, { useState } from 'react'
import "./requesttutor.css"
import { Form,Button } from 'react-bootstrap'
import districts from "../../Data/district_data"
import district from "../../Data/districts.json"
import upazilas from "../../Data/upazilas.json"
import mediums from "../../Data/medium_data"
import classes from "../../Data/class_data"
import subject_data from '../../Data/subject_data'
import salary_range from '../../Data/salary_range'
import URL from '../URL'

const RequestTutor = () => {
  const district_data=district[2].data
  const [upazila, setUpazila] = useState([])
  const [msg, setMsg] = useState("")
  const [postUser, setPostUser] = useState({
    name:"",
    email:"",
    phone:"",
    district:"",
    area:"",
    medium:"",
    class:"",
    subject:"",
    gender:"Any",
    salary_range:"",
    posted_on:new Date().toDateString(),
    status:0
  })
  const updateUpzila=(e)=>{
    const id=e.target.value.split("-")[0]
    const name=e.target.value.split("-")[1]
    setPostUser({...postUser,['district']:name})
    const upz=upazilas[2].data.filter((data)=>{
      if(data.district_id===id){
        return true;
      }
      else{ 
        return false;
      }
    })
    setUpazila(upz)
  }
  
  const handleSubmit=async()=>{  
    await fetch(`${URL}/createpost`, {
      method: 'POST',
      mode: 'cors',
      headers:{
        "ngrok-skip-browser-warning":false,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(postUser)
  })
  .then(response => response.json())
  .then((data)=>{
    setMsg("Your post has been submitted, after reviewing admin will approve it")
  })
  }
  const handleChange=(e)=>{
    
    setPostUser({...postUser,[e.target.name]:e.target.value})
  }
  return (
    <div>
    <div className='parent p-4'>
      <div className="child container text-center shadow p-4">
        <h3 className="text-primary">Looking for tutor?  <span className='text-success'>post your requirements</span> </h3>
<br />
<h4>{msg}</h4>
        <div className="row">
          <div className="col-md-7">
          <div>
      <div className="row me-auto ms-auto">
        {/* <div className="col-md-7"> */}
          <div className="form-group my-3 w-100">
          <input type="text" name='name' onChange={handleChange} placeholder='Enter your full name' className="form-control" />
          </div>
          <br />
          <div className="form-group my-3 w-100">
          <input type="text" name='email' onChange={handleChange} placeholder='email' className="form-control" />
          </div>
          <br />
          <div className="form-group my-3 w-100">
          <input type="text" name='phone' onChange={handleChange} placeholder='Phone' className="form-control" />
          </div>
          <br />
          <div className="my-3">
            <Form.Select onChange={updateUpzila} >
            <option value="">Select Districts</option>
            {district_data.map((data,index)=>{
              return(
              <option key={index} value={data.id+"-"+data.name}>{data.name}</option>
              )              
            })}
          </Form.Select>
          </div>
          
        {/* </div> */}

        <div className="my-3">
          <Form.Select name='area' onChange={handleChange}>
            <option value="">Select Area</option>
            {
              upazila.length>0?
              upazila.map((data,index)=>{
                return(
                  <option key={index} value="">{data.name}</option>
                )
              }):<></>
            }
          </Form.Select>
        </div>
      </div>
      <br />
      <div className="row me-auto ms-auto">
        <div className="">
          <Form.Select name='medium'  onChange={handleChange}>
            <option value="">Any Medium</option>
            {mediums.map((data,index)=>{
              return(
                <option key={index} value={data.id+"-"+data.name}>{data.name}</option>
              )
            })}
          </Form.Select>
        </div>

        <div className="w-100 my-3">
          <Form.Select name='class' onChange={handleChange}>
            <option value="">Any Class</option>
            {classes.map((data,index)=>{
              return(
                <option key={index} value={data.name}>{data.name}</option>
              )
            })}
          </Form.Select>
        </div>
      </div>
      <br />

      <div className="row me-auto ms-auto">

        <div className="col-md-5">
          <Form.Select onChange={handleChange} name="subject">
            <option value="">Any Subject</option>
            {subject_data.map((data,index)=>{
              return (
                <option key={index} value={data}>{data}</option>
              )
            })}
          </Form.Select>
        </div>
        
        <div className="col-md-5">
          <Form.Select name='gender' onChange={handleChange}>
            <option value="Any">Any Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select> <br />
        </div>
        
        
        <div className="col-md-5">
          <Form.Select onChange={handleChange} name="salary">
            <option value="">Salary Range</option>
            {salary_range.map((data,index)=>{
              return(
                <option key={index} value={data}>{data} tk</option>
              )
            })}
          </Form.Select>
        </div>

      
      </div>
      <br />


      
      <div className="d-grid mx-2 gap-2">
        <Button variant="primary" size="" onClick={handleSubmit}>
          POST REQUEST
        </Button>
      </div>

      

    </div>
          </div>
          {/* ssd */}
          <div className="col-md-5">

          </div>
        </div>

      </div>
    </div>
    
    </div>
  )
}

export default RequestTutor