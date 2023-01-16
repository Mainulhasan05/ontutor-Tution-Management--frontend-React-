import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import salary_range from '../../Data/salary_range'
import { storage } from '../../firebase'
import { ref,uploadBytesResumable,getDownloadURL  } from 'firebase/storage'
import URL from '../URL'
import axios from 'axios'
import Multiselect from 'multiselect-react-dropdown';
import district from '../../Data/districts'
import upazilas from "../../Data/upazilas.json"
import medium_data from '../../Data/medium_data'
import { async } from '@firebase/util'
const Profile = () => {
  const {user,setUser}=useContext(UserContext)
  const [degree, setDegree] = useState([])
  const [academic, setAcademic] = useState({
    degree:"",
    institution:"",
    result:"",
    passing_year:""
  })
  const handleAcademic=(e)=>{
    setAcademic({...academic,[e.target.name]:e.target.value})
  }
  const handleAddAcademic=async()=>{
    
    if(academic.degree && academic.institution && academic.result && academic.passing_year){
      await fetch(`${URL}/adddegree`, {
        method: 'POST',
        mode: 'cors',
        headers:{
          "ngrok-skip-browser-warning":false,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({...academic,['user']:user.email})
    })
    .then(response => response.json())
    .then((data)=>{
      if(data.status===200){
        setAcademic({
          "institution":"",
          result:"",
          degree:"",
          passing_year:""
        })
        loadAcademic()
      }
      alert(data.msg)

    })
    }
    else{
      alert("please fill all the fields")
    }
  }
  const loadAcademic=async()=>{
    await fetch(`${URL}/getdegree`, {
      mode:"cors",
      headers: {
        'Content-Type': 'application/json',
        'email': user.email,
        "ngrok-skip-browser-warning":false
      }
    })
  .then(res=>res.json())
  .then(data=>setDegree(data))
  }
  const deleteAcademic=async(id)=>{
    await fetch(`${URL}/deletedegree`, {
      mode:"cors",
      headers: {
        'Content-Type': 'application/json',
        'id': id,
        'email':user.email,
        "ngrok-skip-browser-warning":false
      }
    })
  .then(res=>res.json())
  .then(data=>setDegree(data))
  }
  const [selectedCity, setSelectedCity] = useState([])
  const [selectedPlaceOfTeaching, setselectedPlaceOfTeaching] = useState([])
  const district_data=district[2].data
  const [upazila, setUpazila] = useState([])
  const [selectedDistrict, setselectedDistrict] = useState("")
useEffect(() => {
  if(user.district){
    loadAcademic();
    setselectedDistrict(user.district)
    setSelectedCity(user.area)
    setselectedPlaceOfTeaching(user.preffered_place)
    const upz=upazilas[2].data.filter((data)=>{
      if(data.district_id===user.district_id){
        return true;
      }
      else{
        return false;
      }
    })
    
    setUpazila(upz)
  }
}, [user])

  const placeofTeching=[
    {'name':"Home Visit"},
    {"name":"Coaching Center"},
    {"name":"My Place"},
    ]
  
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
  
  
  setUser({...user,['district_id']:id,['district']:name})
}
  
  const [percentage, setPercentage] = useState(0)
  const [file, setFile] = useState("")
  const [imageURL, setImageURL] = useState("")

  const getCity=(cityList)=>{
    setUser({...user,['area']:cityList})
  }
  const getMedium=(mediumList)=>{
    setUser({...user,['preffered_medium']:mediumList})
  }
  const getPlaceTeaching=(placeList)=>{
    setUser({...user,['preffered_place']:placeList})
  }
  const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  const handleFileChange=(e)=>{
    setFile(e.target.files[0])
  }
  const handleImageUpload=(e)=>{
    
    const storageRef = ref(storage, `/images/${user.email}`)
    const uploadTask = uploadBytesResumable(storageRef,file);
    
    uploadTask.on("state_changed",(snapshot)=>{
      const percent=Math.round(
        (snapshot.bytesTransferred/snapshot.totalBytes)*100
      )
      setPercentage(percent)
    },(err)=>console.log(err),()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then((url)=>{
        setImageURL(url)
        setImage(url)
      })
    }) 
  }
  const setImage=async(url)=>{
    await fetch(`${URL}/updateimage`, {
      method: 'POST',
      mode: 'cors',
      headers:{
        "ngrok-skip-browser-warning":false,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"imageURL":url,"email":user.email})
  })
  .then(response => response.json())
  .then((data)=>{
    setFile("")
    setUser({...user,['imageURL']:url})
    alert(data.msg)
  })
  }
  const handleSubmit=async()=>{
    // await axios.post(`${URL}/updateuser`,user)
    // .then((res)=>{
    //   // setUser(res.data)
    //   if(res.status){
        // localStorage.setItem("user-ontutor", JSON.stringify(user));
        // alert("Profile Updated Successfully")
    //   }
    // })
  await fetch(`${URL}/updateuser`, {
    method: 'POST',
    mode: 'cors',
    headers:{
      "ngrok-skip-browser-warning":false,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(user)
})
.then(response => response.json())
.then(data =>{
  localStorage.setItem("user-ontutor", JSON.stringify(user));
  alert("Profile Updated Successfully")
})
.catch(error => alert("An error occured"));
  }
  return (
    <div className='container'>
      <div className="ms-auto me-auto">
        <div className="card p-4">
          <h3 className="text-success text-center">Your Profile</h3>
          <br />
          <div className="text-center">
            <img width={380} height={250} src={user.imageURL} alt="" />
          </div>
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input value={user.name} onChange={handleChange} type="text" name='name' className="form-control" />
          </div>
          <div className="form-group row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={user.email}/>
    </div>
  </div>

  <div className="form-group row">
    <label className="col-sm-2 col-form-label">Phone</label>
    <div className="col-sm-10">
      <input name='phone' onChange={handleChange} type="text" className="form-control-plaintext" value={user.phone}/>
    </div>
  </div>
  
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">Upload profile Image</label>
    <div className="col-sm-6">
      <input name='image' onChange={handleFileChange} type="file" className="form-control-plaintext"/>
    </div>
    {file? <><button onClick={handleImageUpload} className='col-sm-1 btn border mx-3 btn-info btn-sm'>Upload</button> <span className='col-sm-2'><b>Uploaded {percentage}%</b></span></>:<></>}
    
    
  </div>

  <div className="form-group row mb-2">
    <label className="col-sm-2 col-form-label">Salary (Per Month)</label>
    <div className="col-sm-10">
      <input onChange={handleChange} type="number" name='salary' value={user.salary} className="bg-light form-control"/>
    </div>
  </div>

  <div className="form-group row mb-2">
    <label className="col-sm-2 col-form-label">Gender</label>
    <div className="col-sm-10">
      <select className='form-control' name="genger" id="" onChange={handleChange}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  </div>

  <div className="form-group row mb-2">
    <label className="col-sm-2 col-form-label">District</label>
    <div className="col-sm-10">
      <select  className='form-control' id="" onChange={updateUpzila}>
        <option value="">Select District</option>
      {district_data.map((data,index)=>{
              return(
                <>
                
                {selectedDistrict===data.name ?<>
                  <option selected key={index} value={data.id+"-"+data.name}>{data.name}</option>
                </>:<>
                <option  key={index} value={data.id+"-"+data.name}>{data.name}</option>
                </>}
              
              </>
              )              
        })}
      </select>
    </div>
  </div>

  <div className="form-group row my-1">
    <label className="col-sm-2 col-form-label">Experience</label>
    <div className="col-sm-10">
      <textarea value={user.experience} placeholder=' I am a student of mathematics.I have 4 years experience of teaching.' className='form-control' onChange={handleChange} name="experience" id="" cols="30" rows="3"></textarea>
    </div>
  </div>


  <br />

{/* tution info */}
<br />
  <hr/><h4>Tution Info</h4> <hr />
  <div className="form-group row my-2">
    <label className="col-sm-2 col-form-label">Days per week</label>
    <div className="col-sm-10">
      <input onChange={handleChange} type="numer" name='days_per_week' value={user.days_per_week} className="bg-light form-control"/>
    </div>
  </div>

  <div className="form-group row my-2">
    <label className="col-sm-2 col-form-label">Preffered Tutoring Style</label>
    <div className="col-sm-10">
      <input onChange={handleChange} type="text" name='instituion' value={user.institution} className="bg-light form-control"/>
    </div>
  </div>

  <div className="form-group row my-2">
    <label className="col-sm-2 col-form-label">Place of Teaching</label>
    <div className="col-sm-10">
    <Multiselect
    onSelect={getPlaceTeaching}
    onRemove={getPlaceTeaching}
    showArrow={true}
    selectedValues={selectedPlaceOfTeaching}
    showCheckbox={true}
    options={placeofTeching} // Options to display in the dropdown
    displayValue="name" // Property name to display in the dropdown options
/>
    </div>
  </div>

  <div className="form-group row my-2">
    <label className="col-sm-2 col-form-label">Preffered Medium</label>
    <div className="col-sm-10">
    <Multiselect
    onSelect={getMedium}
    onRemove={getMedium}
    showArrow={true}
    showCheckbox={true}
options={medium_data} // Options to display in the dropdown
displayValue="name" // Property name to display in the dropdown options
/>
    </div>
  </div>

  <div className="form-group row my-2">
    <label className="col-sm-2 col-form-label">Preffered Area</label>
    <div className="col-sm-10">
    <Multiselect
    selectedValues={selectedCity}
    onSelect={getCity}
    onRemove={getCity}
    selectionLimit={5}
    showArrow={true}
    showCheckbox={true}
options={upazila} // Options to display in the dropdown
displayValue="name" // Property name to display in the dropdown options
/>
    </div>
  </div>

  {/* <select class="form-multi-select" multiple data-coreui-search="true">
  <option value="0" selected>Angular</option>
  <option value="1">Bootstrap</option>
  <option value="2">React.js</option>
  <option value="3">Vue.js</option>
  <optgroup label="backend">
    <option value="4">Django</option>
    <option value="5" selected>Laravel</option>
    <option value="6">Node.js</option>
  </optgroup>
</select> */}



  <hr/><h4>Academic Qualifications</h4> <hr />
  <div className="form-group row my-2">
    <label className="col-sm-2 col-form-label">Degree</label>
    <div className="col-sm-10">
      <input onChange={handleAcademic} type="text" name='degree' value={academic.degree} className="bg-light form-control"/>
    </div>
  </div>

  <div className="form-group row my-2">
    <label className="col-sm-2 col-form-label">Institution</label>
    <div className="col-sm-10">
      <input onChange={handleAcademic} type="text" name='institution' value={academic.institution} className="bg-light form-control"/>
    </div>
  </div>

  <div className="form-group row my-2">
    <label className="col-sm-2 col-form-label">Result</label>
    <div className="col-sm-10">
      <input onChange={handleAcademic} type="text" name='result' value={academic.result} className="bg-light form-control"/>
    </div>
  </div>

  <div className="form-group row my-2">
    <label className="col-sm-2 col-form-label">Passing Year</label>
    <div className="col-sm-10">
      <input onChange={handleAcademic} type="text" name='passing_year' value={academic.passing_year} className="bg-light form-control"/>
    </div>
  </div>
  <div className="my-3 p-3 text-center">
    <button onClick={handleAddAcademic} className='btn btn-info'>Add </button>
  </div>
  <br />
  <table className="table">
    <thead>
      <tr>
        <th>Degree</th>
        <th>Institution</th>
        <th>Result</th>
        <th>Passing Year</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        degree.length>0 ? degree.map((data,index)=>{
          return(
      <tr key={index}>
        <td>{data.degree}</td>
        <td>{data.institution}</td>
        <td>{data.result}</td>
        <td>{data.passing_year}</td>
        <td><button className='btn btn-info text-white'>Edit</button> 
        <button className='btn btn-danger mx-2  text-white' onClick={()=>deleteAcademic(data._id)}>Delete</button></td>
      </tr>
          )
        })
        
        
        :<></>
      }
      
    </tbody>
  </table>
  {/* degree:"",
    institution:"",
    passing_year:"",
    result:"",
    hobbies:"",
    experience:"" */}




  <div className="my-3 p-3 text-center">
    <button onClick={handleSubmit} className='btn btn-primary'>Update Profile</button>
  </div>
    


        </div>

      </div>

    </div>
  )
}

export default Profile