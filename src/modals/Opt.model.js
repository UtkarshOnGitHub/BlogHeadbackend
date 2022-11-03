const {Schema , model} = require("mongoose");


const OtpSchema = new Schema({
    otp:Number,
    email:{type:String,required:true,unique:true},
})

const otpModel = model("otp" , OtpSchema)
module.exports = otpModel