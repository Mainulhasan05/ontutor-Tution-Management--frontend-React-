import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons";
import SearchForm from './SearchForm';


const SearchTutor = () => {
  return (
    <div className='card p-4'>
      <div className="alert alert-info">
        <IconContext.Provider value={{ color: "blue","text-size":"20px", className: "global-class-name" }}>
        <IoIosSearch size={30}/> <h5 style={{display:"inline"}}>Search For Tutors</h5>
        </IconContext.Provider>
        </div>
        <SearchForm/>
    </div>
  )
}

export default SearchTutor