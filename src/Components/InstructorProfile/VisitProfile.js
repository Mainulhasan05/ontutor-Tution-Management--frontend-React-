import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {MdEmail,MdChangeHistory} from 'react-icons/md'
import {SiNamecheap} from "react-icons/si"
import {FiPhoneCall} from "react-icons/fi"
import URL from '../URL'

const VisitProfile = () => {
    const {id}=useParams()
    const [user, setUser] = useState({})
    const [degree, setDegree] = useState([])
    useEffect(() => {
        loadData()
    }, [])
    const loadData=async()=>{
        // await axios.get(`${URL}/instructor`, {
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'id': id
        //     }
        //   })
        // .then(res=>{
        //     console.log(res.data)
        //     setUser(res.data)
        // })
        await fetch(`${URL}/instructor`, {
            mode:"cors",
            headers: {
              'Content-Type': 'application/json',
              'id': id,
              "ngrok-skip-browser-warning":false
            }
          })
        .then(res=>res.json())
        .then(data=>{
            setUser(data.user)
            setDegree(data.degree)
        })
    }
    
  return (
    <div>
        {user && <>
        <h2 className="alert alert-info text-center">{user.name}</h2>
        <br />
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <img width={280} height={280} src={user.imageURL} alt="" />
                    <b className='text-center'>#{user._id}</b>
                </div>
                <div className="col-md-7">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th className='my-4'><SiNamecheap size={30}/> Name:</th>
                            <th className='fs-4'>{user.name}</th>
                        </tr>
                        <tr>
                            <th><MdEmail size={25}/> Email:</th>
                            <th>{user.email}</th>
                        </tr>
                        <tr>
                            <th><FiPhoneCall size={25}/> Phone:</th>
                            <th>{user.phone} <a className='mx-3' href={`tel:${user.phone}`}>Call</a></th>
                            
                        </tr>
                        <tr>
                            <th><MdChangeHistory size={25}/>Experience:</th>
                            <th>{user.experience}</th>
                            
                        </tr>
                        </tbody>
                        
                    </table>
                </div>
            </div>
            <br />
            <hr />
            <h4>Tution Info</h4>
            <hr />
            <div className="row container">
                <div className="col-md-9">
                    <div className="row" style={{'color':"black"}}>
                        <div className="col-md-3">
                            <h6>Expected Minimum Salary:</h6>
                        </div>
                        <div className="col-md-4">{user.salary} tk/month</div>
                    </div>
<hr />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>Days Per Week:</h6>
                        </div>
                        <div className="col-md-4">{user.days_per_week} days/week</div>
                    </div>
<hr />
<div className="row">
                        <div className="col-md-3">
                            <h6>Preffered Area:</h6>
                        </div>
                        <div className="col-md-4">
                        {user.area ? user.area.map((data,index)=>{
                                return(
                                    <span key={index}>{data.name}, </span>
                                )
                            }):<></>}
                        </div>
                    </div>
<hr />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>Preffered Tutoring Style:</h6>
                        </div>
                        <div className="col-md-4">
                        {user.preffered_place ? user.preffered_place.map((data,index)=>{
                                return(
                                    <span key={index}>{data.name}, </span>
                                )
                            }):<></>}
                        </div>
                    </div>
<hr />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>Preffered Medium of Teaching:</h6>
                        </div>
                        <div className="col-md-4">
                            {user.preffered_medium ? user.preffered_medium.map((data,index)=>{
                                return(
                                    <span key={index}>{data.name}, </span>
                                )
                            }):<></>}
                        </div>
                    </div>


                </div>
                <div className="col-md-4 mx-2">

                </div>
            </div>
            <br />
            <hr />
            <h4>Academic Qualifications</h4>
            <hr />
            <div className="row">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Degree</th>
                                <th>Institution</th>
                                <th>Result</th>
                                <th>Passing Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {degree.length>0 ? degree.map((data,index)=>{
                                return(
                            <tr key={index}>
                                <td>{data.degree}</td>
                                <td>{data.institution}</td>
                                <td>{data.result}</td>
                                <td>{data.passing_year}</td>
                            </tr>
                                )
                            }) 
                            :<></>
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        </>}
    </div>
  )
}

export default VisitProfile