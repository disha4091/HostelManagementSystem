const express = require('express') ;
const mysql = require('mysql2') ;
const app = express() ;
const cors = require('cors') ; 
const bodyParser = require('body-parser') ;
const cookieParser = require('cookie-parser') ;
const session = require('express-session') ;
const Config_details = require('./config') ;
const bcrypt = require('bcrypt') ;
const saltRounds = 10 ;

const jwt = require('jsonwebtoken') ;
app.use(express.json()) ;
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST'],
    credentials: true
})) ;
app.use(cookieParser()) ;
app.use(bodyParser.urlencoded({extended: true})) ;

app.use(session({
    key: "UserId",
    secret: "secretkey" ,
    resave: false,
    saveUninitialized: false,
    cookie:{
       expires: 60*60  
    }


}))

const db = {
    host: Config_details.host,
    user: Config_details.user,
    password: Config_details.password,
    database: Config_details.database,
    port: 3306,
    insecureAuth: true
};
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

const con = mysql.createConnection(db);

app.post('/register' , (req,res)=>{
    
    const Username = req.body.Username
    const Email = req.body.Email
    const Area_pin = req.body.Area_pin
    const Area = req.body.Area
    const City = req.body.City
    const Password = req.body.Password
    const Role = req.body.Role
    bcrypt.hash(Password, saltRounds, (err,hash) =>{
        if(err) {
            console.log(err);
        }
        con.query("INSERT INTO `users` ( Role,Username, Email,Area_pin, Area, City, Password) VALUES(?,?,?,?,?,?,?)"
    , [ Role, Username, Email,Area_pin, Area, City,hash] , (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send("Values Inserted") ;
        }
    }) ;
    })
    

}) ;

app.get("/login", (req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }
    else{
        res.send({loggedIn: false}) ;
    }
})
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token){
        res.send("No token given") ;
    }
    else{
        jwt.verify(token, "jwtSecret", (err, decoded) => {
           if(err){
               res.send({auth:false, message:"You have failed to authenticate"}) ;
           } 
           else{
               req.UserId = decoded.id ;
               req.Username = decoded.Username ;
               next() ;
           }
        })
    }
}
app.get('./isUserAuth', verifyJWT, (req,res)=>{
    res.send("Yor are authenticated") ;
})
app.post('/login', (req,res)=>{
    const Email = req.body.Email ;
    const Password = req.body.Password ;

    con.query("SELECT * FROM users WHERE Email = ?",
    Email,
    (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            if(result.length > 0){
                bcrypt.compare(Password, result[0].Password, (error, response)=>{
                    if(response){

                        const id = result[0].id;
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 300,
                        })
                        req.session.user = result ;
                        console.log(req.session.user);
                        res.json({auth:true, token:token, result:result}) ;
                        
                    }
                    else{
                        res.json({auth:false, message: "Password and username do not match"})
                    }
                })
            }
            else{
                res.json({auth:false, message: "User doesnt exist"}) ;
            } 
            
        }
        
    })
})
app.listen(3001, ()=>{
    console.log("Server running");
})