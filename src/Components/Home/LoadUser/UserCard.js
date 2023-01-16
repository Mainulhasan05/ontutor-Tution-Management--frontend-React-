import React from 'react'

const UserCard = ({data}) => {

  return (
    <div className=''>
      
      <div className="card text-center">
        <img width={100} height={100} src={data.imageURL} alt="" className="card-image-top me-auto ms-auto" />
        <h5 className="card-title">{data.name}</h5>
        <p className="card-text">Salary: {data.salary}/month</p>
        <p className="card-text text-bold">{data.district} </p>
      </div>
    </div>
  )
}

export default UserCard