import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import "./verifiedUser.css"
import { Button } from 'react-bootstrap';
const UserCards = () => {
  return (
    <div className='card my-2 p-2' id='verfiedUserCard'>
        <div className="row">
                {/* image div */}
            <div className="col-md-2 col-sm-2 text-center">
                {/* <FaUserCircle size={70}/><br /> */}
                <img width={100} height={120} src={"https://portal.ewubd.edu/Documents/StudentProfile/2019-2-60-003.jpg"} alt="" />
                
                <b>ID: #36215454</b>
            </div>
            {/* name,member,qualification div */}
            <div className="col-md-4">
                <p style={{"marginBottom":"0px"}} className="text-success"><b>Kh Foysal</b></p>
                <p style={{"marginBottom":"0px"}}    className="small text-muted">Member Since: April 01, 2022</p>
                <p className="small">6000tk/month, Dhaka</p>
            </div>
            {/* Areas */}
            <div className="col-md-4">
                <b>Areas:</b> Rampura, Badda, Banasree, Aftabnagar
            </div>
            {/* actions */}
            <div className="col-md-1">
            <Button variant="info" size="sm">View Details</Button>
            
            <Button className='my-3' variant="secondary" size="sm">Contact</Button>
            </div>
        </div>
    </div>
  )
}

export default UserCards