const express = require("express");
const http = require("http")
const mongoose = require("mongoose");
const cors =require("cors")
const passport = require("./google-oauth");
const user = require("./routes/user.routes");
const refresh = require("./routes/refresh.routes");
const blog = require("./routes/blogs.routes");
const { Server } = require("socket.io");
const comment = require("./routes/comment.routes");
const commentModel = require("./modals/comment.modal");
const UserModel = require("./modals/User.model");
const blogModel = require("./modals/blog.modal");


const jwt = require("jsonwebtoken");


require('dotenv').config();
const key = process.env.SECRET_KEY

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

const server = http.createServer(app)

app.use("/user" , user)

app.use("/refresh" , refresh)

app.use("/blogs" , blog)

app.use("/comments" , comment)


const io = new Server(server , {
  cors:{
    origin:"http://localhost:3000",
    methods:["GET" ,"POST"]
  }
})


io.on ('connection', (socket) => {
    socket.on("comment", async (data)=>{
      const verify = jwt.verify(data.userId , key )
      const user = await UserModel.findById(verify.id);
      const blog = await blogModel.findById(data.blogId);
      const saveInfo = new commentModel({comment:data.comment,date:data.date,user:user.id,blog:blog.id})
      await saveInfo.save()
    })
});























// app.get("/github/callback" ,(req,res)=>{
//     let token = req.query.code
//     if(token){
//         res.redirect("http://localhost:3000")
//     }else{
//         res.send("Unauthorized")
//     }
    
// });



// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile' , "email"] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' , session:false }),
//   function(req, res) {
//     res.redirect('http://localhost:3000');
// });




mongoose.connect("mongodb://localhost:27017/day-2").then(()=>{
    server.listen(8080 , ()=>{
        console.log("Server is Running on Port http://localhost:8080")
    })
})
