import React, { useState } from 'react'
import LoadUser from './LoadUser/LoadUser'
import UserCard from './LoadUser/UserCard'
import SearchTutor from './SearchTutor/SearchTutor'
import ShowImage from './ShowImage/ShowImage'

const Home = () => {
  const [district, setDistrict] = useState("")
  return (
    <div>
        <div className="row my-2">
            <div className="col-md-6">
                <SearchTutor setDistrict={setDistrict}/>
            </div>
            <div className="col-md-6">
                <ShowImage/>
            </div>
        </div>

        {/* users card will be displayed */}
        <LoadUser district={district}/>
        
    </div>
  )
}

export default Home