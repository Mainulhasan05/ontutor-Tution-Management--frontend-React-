import React from 'react'
import UserCards from './UserCards'

const AvailableTutions = () => {
  return (
    <div className='container'>
        <h4>Verified Tutors: 06</h4>
        <div className="row">
            <div className="col-md-8">
                <UserCards/>
                <UserCards/>
                <UserCards/>
                <UserCards/>
                <UserCards/>
                <UserCards/>
            </div>
            <div className="col-md-4">

            </div>
        </div>
    </div>
  )
}

export default AvailableTutions