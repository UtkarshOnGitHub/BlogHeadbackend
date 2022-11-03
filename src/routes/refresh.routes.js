const {Router} = require("express");

const jwt = require("jsonwebtoken"); 

const refresh = Router();


refresh.post("/refresh" , async(req,res)=>{
    const refreshtoken = req.headers.authorization
     
    try{
        const data = jwt.verify(refreshtoken , refreshKey)
        const maintoken = jwt.sign(data , key)
        return res.send({token:maintoken})

    }catch(e){
        return res.send("refresh token invalid")
    }
})

module.exports = refresh