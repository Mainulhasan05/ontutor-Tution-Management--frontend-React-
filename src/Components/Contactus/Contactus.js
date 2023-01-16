import React from 'react'
import MessengerCustomerChat  from "react-messenger-customer-chat";

const Contactus = () => {
  return (
    <div className='container'>
        <h3 className="alert alert-info">Contact Us</h3>

        <MessengerCustomerChat
        pageId="100089083303397"
        appId="1170977990476885"
        />
    </div>
  )
}

export default Contactus