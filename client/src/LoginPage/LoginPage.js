// import React from 'react'
// import {useState, useEffect} from "react" ;
// import Axios from "axios" ;
// const LoginPage = () => {
//     const [Email, setEmail] = useState('') ;
//     const [Password, setPassword] = useState('') ;
//     const [loginStatus, setLoginStatus] = useState('') ;
//     const loginUser = () =>{
//         Axios.post('http://localhost:3001/login',
//         {Email:Email, Password:Password})
//         .then((response)=>{
//             if(response.data.message){
//                 setLoginStatus(response.data.message) ;
//             }
//             else{
//                 setLoginStatus(response.data[0].Username) ;
//             }
//           console.log(response);
//         }) ;
//       } ;

//       useEffect(()=>{
//         Axios.get("http://localhost:3001/login").then((response)=>{
//             console.log(response);
//             if(response.data.loggedIn == true) {
//                 setLoginStatus(response.data.user[0].Username) ;
//             }
            
//         })
//     },[])
//     return (
//         <div>
//             <h2>Login here!</h2>
//             <label>Enter your email address</label>
//             <input type="text"  onChange={(event) => {setEmail(event.target.value)}}></input>
//             <br></br><br></br>
//             <label>Enter your password</label>
//             <input type="text"  onChange={(event) => {setPassword(event.target.value)}}></input>
//             <br></br><br></br>
//             <button onClick={loginUser}>Login</button>
//             <h2>{loginStatus}</h2>
//             </div>
//     )
// }

// export default LoginPage
