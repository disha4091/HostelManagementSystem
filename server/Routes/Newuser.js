const express = require("express");
const app = express();
const router = express.Router() ;
const db = require('../config') ;


router.post("/create" , (req,res)=>{
    const UserId = req.body.UserId
    const Username = req.body.Username
    const Email = req.body.Email
    const Area_pin = req.body.Area_pin
    const Area = req.body.Area
    const City = req.body.City

    db.query("INSERT INTO `users` (UserId, Username, Email,Area_pin, Area, City) VALUES(?,?,?,?,?,?)"
    , [UserId, Username, Email,Area_pin, Area, City] , (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send("Values Inserted") ;
        }
    }) ;

})

module.exports = router ;