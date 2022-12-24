// import { FaBeer } from "react-icons/fa";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Routes,Route} from "react-router-dom"
import Home from './Components/Home/Home';
import SearchTutor from './Components/SearchTutor/SearchTutor';
import data from "./Data/city_data"
import Footer from './Components/Footer/Footer';
import RequestTutor from './Components/Request Tutor/RequestTutor';
import VerifiedTutors from './Components/VerifiedTutors/VerifiedTutors';
import Login from './Components/Authentication/Login/Login';
import Register from './Components/Authentication/Register/Register';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search_tutors" element={<SearchTutor/>}/>
        <Route path="/request_tutor" element={<RequestTutor/>}/>
        <Route path="/verified_tutors" element={<VerifiedTutors/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
