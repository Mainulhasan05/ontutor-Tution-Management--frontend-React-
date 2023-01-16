import React, { useEffect, useState } from 'react'
import UserCards from './UserCards'
import URL from '../URL'

const AvailableTutions = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
        loadPosts()
  }, [])
  
  const loadPosts=async()=>{
      await fetch(`${URL}/getpost`, {
          mode: 'cors',
          headers:{
            "ngrok-skip-browser-warning":false
          }
        })
        .then(res=>res.json())
        .then(data=>{
          setPosts(data)
        })
  }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-8">
              {
                posts.map((data,index)=>{
                  return(
                    <>
                    {
                      data.status==1?<UserCards key={index} data={data}/>:<></>
                    }  
                    </>
                  )
                })
              }
                
            </div>
            <div className="col-md-4">

            </div>
        </div>
    </div>
  )
}

export default AvailableTutions