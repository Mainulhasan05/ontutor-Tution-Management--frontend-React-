import React, { useState } from 'react'
import SearchForm from '../Home/SearchTutor/SearchForm'

const SearchTutor = () => {
  const [includeSalary, setIncludeSalary] = useState(true)
  const name="Md. Mainul Hasan"
  return (
    <div>
      <br />
        <SearchForm includeSalary={includeSalary}/>
    </div>
  )
}

export default SearchTutor