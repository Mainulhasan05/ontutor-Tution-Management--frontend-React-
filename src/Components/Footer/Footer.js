import React from 'react'
import CustomerService from './CustomerService'
import FollowUs from './FollowUs'

const Footer = () => {
  return (
    <div>
        <div className="bg-primary" style={{"marginTop":"81vh","padding":"10px"}}>
            <div className="row">
                <div className="col-3 mx-4">
                    <FollowUs/>
                </div>
                <div className="col-5">
                    <CustomerService/>
                </div>
                <div className="col-3">Address</div>
            </div>
            <h5 className='text-center text-white'>ontutors.com</h5>
        </div>
    </div>
  )
}

export default Footer