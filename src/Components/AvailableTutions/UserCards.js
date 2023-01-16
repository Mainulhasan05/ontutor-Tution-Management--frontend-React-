import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import "./verifiedUser.css"
import { Button } from 'react-bootstrap';
const UserCards = ({data}) => {
  return (
    <div className='card my-2 p-2' id='verfiedUserCard'>
        <div className="row">
            <div className="my-2">
                <h6 className='text-center'>Tution For {data.class}</h6>
                <hr />
                <div className="row">
                    <div className="col-md-2">
                        Name: 
                    </div>
                    <div className="col-md-6">
                    {data.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        Phone: 
                    </div>
                    <div className="col-md-6">
                    {data.phone}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        Tutor Gender: 
                    </div>
                    <div className="col-md-6">
                    {data.gender}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        Salary: 
                    </div>
                    <div className="col-md-6">
                    {data.salary}
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default UserCards