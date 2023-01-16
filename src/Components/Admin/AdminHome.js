import React, { useEffect, useState } from 'react'
import URL from '../URL'

const AdminHome = () => {
    const [posts, setPosts] = useState([])
    const [postVisible, setPostVisible] = useState(0)
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
          .then(data=>setPosts(data))
    }

    const updateStatus=async({id,status})=>{
        await fetch(`${URL}/changepoststatus`, {
            mode: 'cors',
            headers:{
              "ngrok-skip-browser-warning":false,
              "id":id,
              "status":status
            }
          })
          .then(res=>res.json())
          .then(data=>setPosts(data))
    }

    const deletePost=async({id})=>{
        await fetch(`${URL}/deletepost`, {
            mode: 'cors',
            headers:{
              "ngrok-skip-browser-warning":false,
              "id":id,
            }
          })
          .then(res=>res.json())
          .then(data=>setPosts(data))
    }
    
  return (
    <div>
        <h3 className="text-center my-3 alert alert-info">Admin Panel</h3>
        <div className="container">
            <div className="text-center mb-3">
                <button onClick={()=>setPostVisible(0)} className='btn btn-success text-white mx-2'>PENDING POSTS</button>
                <button onClick={()=>setPostVisible(1)} className='btn btn-warning text-white mx-2'>APPROVED POSTS</button>
            </div>
            {postVisible==0?
                <div id='pending_posts'>
                    <h5>Pending Posts:</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Class</td>
                            <td>Salary_Range</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((data,index)=>{
                                return(
                        <>{
                            data.status==0?<tr>
                            <td>{data.name}</td>
                            <td>{data.phone}</td>
                            <td>{data.class}</td>
                            <td>{data.salary}</td>
                            <td>
                                <button onClick={()=>updateStatus({id:data._id,status:data.status})} className="btn btn-success text-white mx-2">Approve</button>
                                <button onClick={()=>deletePost({id:data._id})} className="btn btn-danger  text-white">Delete</button>
                            </td>
                        </tr>:<></>
                        }</>
                                )
                            })
                        }
                        
                        
                    </tbody>
                </table>
            </div>
:
            <div id='approved_posts'>
                <h5>Approved Posts:</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Class</td>
                            <td>Salary_Range</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((data,index)=>{
                                return(
                        <>{
                            data.status==1?<tr>
                            <td>{data.name}</td>
                            <td>{data.phone}</td>
                            <td>{data.class}</td>
                            <td>{data.salary}</td>
                            <td>
                                <button onClick={()=>updateStatus({id:data._id,status:data.status})} className="btn btn-success text-white mx-2">Refuse</button>
                                <button onClick={()=>deletePost({id:data._id})} className="btn btn-danger  text-white">Delete</button>
                            </td>
                        </tr>:<></>
                        }</>
                                )
                            })
                        }
                        
                        
                    </tbody>
                </table>
            </div>}
        </div>
    </div>
  )
}

export default AdminHome