import React from 'react'
import MessengerCustomerChat  from "react-messenger-customer-chat";

const Contactus = () => {
  return (
    <div className='container'>
        <h3 className="alert alert-info">Contact Us</h3>

        <MessengerCustomerChat
        pageId="101435796170702"
        appId="1573007393142582"
        />
    </div>
  )
}

export default Contactus