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
    const UserId = req.body.UserId
    const Username = req.body.Username
    const Email = req.body.Email
    const Area_pin = req.body.Area_pin
    const Area = req.body.Area
    const City = req.body.City
    const Password = req.body.Password
    bcrypt.hash(Password, saltRounds, (err,hash) =>{
        if(err) {
            console.log(err);
        }
        con.query("INSERT INTO `users` (UserId, Username, Email,Area_pin, Area, City, Password) VALUES(?,?,?,?,?,?,?)"
    , [UserId, Username, Email,Area_pin, Area, City,hash] , (err, result) => {
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
                        req.session.user = result ;
                        console.log(req.session.user);
                        res.send(result); ;
                    }
                    else{
                        res.send({message: "Wrong Combination"})
                    }
                })
            }
            else{
                res.send({message: "User doesnt exist"}) ;
            } 
            
        }
        
    })
})
app.listen(3001, ()=>{
    console.log("Server running");
})