var GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport = require("passport")
require('dotenv').config();
const mongoose = require("mongoose");
const UserModel = require('./modals/User.model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    let email = profile._json.email
    console.log(email)
    const check = await UserModel.find({email})
    console.log(check,"userdetail")
    if(check.length===0){
      const user = new UserModel({
        name:profile._json.name,
        email:profile._json.email,
        password:Math.floor(Math.random()*10000000),
        role:"Explorer"
      })
      await user.save()
    }
    return cb(null, "user");
  }
));

module.exports = passport
