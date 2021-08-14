const express = require('express') ;
const mysql = require('mysql2') ;
const app = express() ;
const cors = require('cors') ; 
const Config_details = require('./config') ;
app.use(cors()) ;
app.use(express.json()) ;


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

app.post('/create' , (req,res)=>{
    const UserId = req.body.UserId
    const Username = req.body.Username
    const Email = req.body.Email
    const Area_pin = req.body.Area_pin
    const Area = req.body.Area
    const City = req.body.City

    con.query("INSERT INTO `users` (UserId, Username, Email,Area_pin, Area, City) VALUES(?,?,?,?,?,?)"
    , [UserId, Username, Email,Area_pin, Area, City] , (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send("Values Inserted") ;
        }
    }) ;

}) ;

app.listen(3001, ()=>{
    console.log("Server running");
})