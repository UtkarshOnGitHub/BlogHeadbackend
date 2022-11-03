const {Router} = require("express");
const blogModel = require("../modals/blog.modal");
const commentModel = require("../modals/comment.modal");
const UserModel = require("../modals/User.model");
const jwt = require("jsonwebtoken");


const comment = Router();


require('dotenv').config();
const key = process.env.SECRET_KEY



// comment.post("/postComment", async (req,res)=>{
//     const {id} = req.headers
//     const {comment} = req.body;
//     const token = req.headers.token;
    
    
//     try{
//         const data = jwt.verify(token , key );
//         const user = await UserModel.findById(data.id)
//         const blog = await blogModel.findById(id);
//         const saveComm = new commentModel({comment:comment ,date:date, user:user.id,blog:blog.id})
//         await saveComm.save()
//         res.send("done")
//     }catch(err){
//         res.send(err)
//     }
// })




comment.get("/showComments/:id" , async (req,res)=>{
    const {id} = req.params;
    try {
        const comment = await commentModel.find({blog:id}).populate("user")
        res.send(comment)
    } catch (error) {
        res.send({error:error})
    }
})

comment.delete("/deleteComment/:id" , async (req,res)=>{
    const {id} = req.params;
    try {
        await commentModel.findByIdAndDelete(id)
        res.status(200).send("Comment Deleted")
    } catch (error){
        res.send({error:error})
    }
})



module.exports = comment