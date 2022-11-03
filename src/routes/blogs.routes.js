const {Router} = require("express")
const jwt = require("jsonwebtoken");
const blogModel = require("../modals/blog.modal");
const commentModel = require("../modals/comment.modal");
const UserModel = require("../modals/User.model");
const blog = Router();


require('dotenv').config();
const key = process.env.SECRET_KEY

blog.post("/writeblogs" , async (req,res)=>{
    const token = req.headers.token;
    let {title , content} = req.body;
    const data = jwt.verify(token , key );
    const check = await UserModel.findById(data.id);
    let role = check.role;
    if(role !== "Writer"){
        res.status(401).send("You Are Not Authorized")
    }else{
        const saveBlog = new blogModel({title:title , content:content,user:check.id})
        await saveBlog.save()
        res.send({blog:title, message:"Blog Updated"});
    }
})


blog.get("/showblogs" , async (req,res)=>{
    const data  = await blogModel.find({}).populate("user");
    res.send({data:data})
})

blog.get("/showblogs/:id" , async (req,res)=>{
    const {id} = req.params
    const data  = await blogModel.findById(id).populate("user");
    res.send(data)
})

blog.delete("/deleteblog/:id" , async (req,res)=>{
    const {id} = req.params
    try {
        await blogModel.findByIdAndDelete(id);
        res.send("Deleted")
    } catch (error) {
        console.log(error)
    }

})

blog.patch("/updateblog",async (req,res)=>{
    try{
        const id = req.headers.id;
        const {title,content} = req.body
        const data = await blogModel.findByIdAndUpdate({_id:id},{$set:{"title":title,"content":content}} , {useFindAndModify:false});
        res.send(data)
    } catch (error) {
        res.send({err:error.message})
    }
})




module.exports = blog;