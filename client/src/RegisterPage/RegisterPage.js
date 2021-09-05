import React from 'react'
import {useState, useEffect} from "react" ;
import Axios from "axios" ;
import './style.css';

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
          <div className="container">
    	<div className="myCard">
    		<div className="row">
    			<div className="col-md-6">
    				<div className="myLeftCtn">

    					<form className="myForm text-center">
    						<header>Create New Account</header>

                                <div className="form-group">
                                    <i className="fas fa-user"></i>
                                   
                                    <input type="number" className="myInput" placeholder="UserId"  value={UserId} onChange={(e) => {setUserId(e.target.value)}}/>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>

                            <div className="form-group">
    							<i className="fas fa-user"></i>
                              <input type="text" className="myInput" placeholder="Username" value={Username} onChange={(e) => {setUsername(e.target.value)}}/>
                            </div>


    						<div className="form-group">
    							<i className="fas fa-envelope"></i>
                              <input type="text" className="myInput" placeholder="Email" value={Email} onChange={(e) => {setEmail(e.target.value)}}/>
                            </div>

                         {/* areapin */}
                          <div className="form-group">
                                    <i className="fas fa-user"></i>
                                   <input type="number" className ="myInput" placeholder="AreaPIN" value={Area_pin} onChange={(e) => {setAreapin(e.target.value)}}/>
                                    <div class="invalid-feedback">Please fill out this field.</div>
                                </div>


                            
                              <div className="form-group">
                                    <i className="fas fa-user"></i>
                                   <input type="text" className ="myInput" placeholder="Address" value={Area} onChange={(e) => {setArea(e.target.value)}}/>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>

                            
                                <div className="form-group">
                                    <i className="fas fa-user"></i>
                                   <input type="text" className ="myInput" placeholder="City" value={City} onChange={(e) => {setCity(e.target.value)}}/>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>


                            <div className="form-group">
    							<i className="fas fa-lock"></i>
                                <input className="myInput" type="text" placeholder="Password" value={Password} onChange={(e) => {setPassword(e.target.value)}}/>   
                            </div>

                            <div className="form-group">
                                <i className="fas fa-lock"></i>
                                <input className="myInput" type="text" placeholder="Confirm Password" onChange={(e) => {setPassword(e.target.value)}}/>
                            </div> 

                            <div className="form-group">
                            	<label><input id="check_1" type="checkbox" name="check_1"/><small>I read and agree to Terms & Conditions</small></label>
                                <div className="invalid-feedback">You must check the box.</div>
                            </div>

                           <input type="button" className="butt" onClick={addUser}  value="Add"/> 
                        </form>
                    </div>
                   </div>


           <div className="col-md-6">
                <div className="myRightCtn"> 
                    <form className="myForm text-center">
                    <div className="box">
                      <header>Login here!</header>    
                      
                        <div className="form-group">
                            <i className="fas fa-envelope"></i>
                            <input className="myInput" type="text" placeholder="Email" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
                        
                        </div>
                        
                        <div className="form-group">
                            <i className="fas fa-lock"></i>
                            <input className="myInput" type="text" placeholder="Password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                        
                        </div>
                      <input type="button" className="butt_out" value="Login"/> 
                  </div>
                </form>

              </div>
          </div>
      </div>
  </div>
</div>

      

    )
}

export default RegisterPage
