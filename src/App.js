// import { FaBeer } from "react-icons/fa";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Routes,Route} from "react-router-dom"
import Home from './Components/Home/Home';
import SearchTutor from './Components/SearchTutor/SearchTutor';
import data from "./Data/city_data"
import Footer from './Components/Footer/Footer';
import RequestTutor from './Components/Request Tutor/RequestTutor';
import VerifiedTutors from './Components/AvailableTutions/AvailableTutions';
import Login from './Components/Authentication/Login/Login';
import Register from './Components/Authentication/Register/Register';
import Contactus from './Components/Contactus/Contactus';
import Profile from './Components/Profile/Profile';
import AvailableTutions from './Components/AvailableTutions/AvailableTutions';
import { createContext, useEffect, useState } from 'react';
import VisitProfile from './Components/InstructorProfile/VisitProfile';

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState([]);
  const myUser = JSON.parse(localStorage.getItem("user-ontutor"));
  useEffect(() => {
    if (myUser) {
      
      setUser(myUser);
    }
  }, [])
  const updateUser = (user) => {

    localStorage.setItem("user-ontutor", JSON.stringify(user));
    setUser(user);
    
  }
  
  return (
    <div className="App">
      <UserContext.Provider value={{user,setUser,updateUser}}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search_tutors" element={<SearchTutor/>}/>
        <Route path="/request_tutor" element={<RequestTutor/>}/>
        <Route path="/available_tutions" element={<AvailableTutions/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/contactus" element={<Contactus/>}/>
        <Route path="/profile1" element={<Profile/>}/>
        <Route path="/instructor/:id" element={<VisitProfile/>}/>
      </Routes>
      </UserContext.Provider>
      <Footer/>
    </div>
  );
}

export default App;
