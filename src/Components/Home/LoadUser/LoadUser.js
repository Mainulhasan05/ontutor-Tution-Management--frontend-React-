import React, { useEffect, useState } from 'react'
import axios from 'axios'
import URL from '../../URL'
import UserCard from './UserCard'
import { Link } from 'react-router-dom'
const LoadUser = () => {
  const [profile, setProfile] = useState([])
    useEffect(() => {
      loadUser()
    }, [])
    const loadUser=async()=>{
      // await axios.get(`${URL}/get_users`)
      // .then(res=>{
      //   console.log(res.data)
      //   setProfile(res.data)

      // })

      fetch(`${URL}/get_users`, {
        mode: 'cors',
        headers:{
          "ngrok-skip-browser-warning":false
        }
      })
      .then(res=>res.json())
      .then(data=>setProfile(data))
    }
  return (
    <div>
      <div className="container">
          <div className="row">
            {profile.length!=0 &&
              profile.map((data,index)=>{
                return(
                  <div key={index} className="col-md-3">
                  <Link to={`/instructor/${data._id}`}>
                  <UserCard data={data} />
                  </Link>
                  </div>
                )
              })
            }

          </div>
        
        </div>
    </div>
  )
}

export default LoadUser