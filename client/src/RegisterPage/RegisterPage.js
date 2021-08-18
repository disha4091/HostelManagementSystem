import React from 'react'
import {useState, useEffect} from "react" ;
import Axios from "axios" ;
const RegisterPage = () => {
    const [UserId, setUserId] = useState(0) ;
    const [Username, setUsername] = useState("") ;
    const [Email, setEmail] = useState("") ;
    const [Area_pin, setAreapin] = useState(0) ;
    const [Area, setArea] = useState("") ;
    const [City, setCity] = useState("") ;
    const [Password, setPassword] = useState("") ;
  
    Axios.defaults.withCredentials = true ;
    const addUser = () =>{
      Axios.post('http://localhost:3001/register',
      {UserId: UserId, Username: Username, Email:Email,Area_pin:Area_pin, Area:Area, City:City, Password:Password})
      .then((response)=>{
        console.log("success");
      }) ;
    } ;

    
    return (
        <div>
        <h1>Hostel Manager</h1>
        <label>UserId</label>
        <input type="number" onChange={(event) => {setUserId(event.target.value)}}></input>
        <br></br>
        <br></br>
        <label>Username</label>
        <input type="text" onChange={(event) => {setUsername(event.target.value)}}/>
        <br></br>
        <br></br>
        <label>Email</label>
        <input type="text" onChange={(event) => {setEmail(event.target.value)}}/>
        <br></br>
        <br></br>
        <label>Area_pin</label>
        <input type="number" onChange={(event) => {setAreapin(event.target.value)}}/>
        <br></br>
        <br></br>
        <label>Area</label>
        <input type="text" onChange={(event) => {setArea(event.target.value)}}/>
        <br></br>
        <br></br>
        <label>City</label>
        <input type="text" onChange={(event) => {setCity(event.target.value)}}></input>
        <br></br><br></br>
        <label>Set Password</label>
        <input type="text" onChange={(event) => {setPassword(event.target.value)}}></input>
        <br></br><br></br>
        <button onClick={addUser}>Add</button> 
        </div>
    )
}

export default RegisterPage
