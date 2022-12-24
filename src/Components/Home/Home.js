import React from 'react'
import UserCard from './LoadUser/UserCard'
import SearchTutor from './SearchTutor/SearchTutor'
import ShowImage from './ShowImage/ShowImage'

const Home = () => {
  return (
    <div>
        <div className="row my-2">
            <div className="col-md-6">
                <SearchTutor/>
            </div>
            <div className="col-md-6">
                <ShowImage/>
            </div>
        </div>

        {/* users card will be displayed */}
        <div className="container">
          <div className="row">
            <div className="col-md-3">
            <UserCard/>
            </div>

            <div className="col-md-3">
            <UserCard/>
            </div>

            <div className="col-md-3">
            <UserCard/>
            </div>
          </div>
        
        </div>
        
    </div>
  )
}

export default Home