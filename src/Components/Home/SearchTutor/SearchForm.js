import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import districts from "../../../Data/district_data"
import district from "../../../Data/districts.json"
import upazilas from "../../../Data/upazilas.json"

const SearchForm = ({includeSalary}) => {
  const district_data=district[2].data
  const [upazila, setUpazila] = useState([])
  
  const updateUpzila=(e)=>{
    const id=e.target.value.split("-")[0]
    const name=e.target.value.split("-")[1]
    const upz=upazilas[2].data.filter((data)=>{
      if(data.district_id===id){
        return true;
      }
      else{
        return false;
      }
    })
    setUpazila(upz)
  }
  
  return (
    <div>
      <div className="row me-auto ms-auto">
        <div className="col-md-5">
          <Form.Select onChange={updateUpzila}>
            <option value="">All Districts</option>
            {district_data.map((data,index)=>{
              return(
              <option key={index} value={data.id+"-"+data.bn_name}>{data.bn_name}</option>
              )              
            })}
          </Form.Select>
        </div>

        <div className="col-md-5">
          <Form.Select>
            <option value="">All Area</option>
            {
              upazila.length>0?
              upazila.map((data,index)=>{
                return(
                  <option key={index} value="">{data.bn_name}</option>
                )
              }):<></>
            }
          </Form.Select>
        </div>
      </div>
      <br />
      <div className="row me-auto ms-auto">
        <div className="col-md-5">
          <Form.Select>
            <option value="">Any Medium</option>
          </Form.Select>
        </div>

        <div className="col-md-5">
          <Form.Select>
            <option value="">Any Class</option>
          </Form.Select>
        </div>
      </div>
      <br />

      <div className="row me-auto ms-auto">

        <div className="col-md-5">
          <Form.Select>
            <option value="">Any Subject</option>
          </Form.Select>
        </div>
        {includeSalary===true ?
        <div className="col-md-5">
          <Form.Select>
            <option value="">Any Gender</option>
          </Form.Select> <br />
        </div>:<></> }
        
        {includeSalary===true ?
        <div className="col-md-5">
          <Form.Select>
            <option value="">Salary Range</option>
          </Form.Select>
        </div>:<></>}

        {includeSalary===true ?
      <div className="col-md-5 ms-auto">
        <Button variant="success" size="">
          Search Tutor
        </Button>
        
      </div>
      :<></>}
      </div>
      <br />


      {includeSalary!==true ?
      <div className="d-grid mx-2 gap-2">
        <Button variant="primary" size="">
          Search Tutor
        </Button>
      </div>:<></>}

      {includeSalary===true ? <hr />:<></>}

    </div>
  )
}

export default SearchForm