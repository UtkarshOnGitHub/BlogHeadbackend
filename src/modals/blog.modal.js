const {Schema , model} = require("mongoose");


const BlogSchema = new Schema({
    title:String,
    content:String,
    user:{ type: Schema.Types.ObjectId, ref: 'user' },

})

const blogModel = model("blog" , BlogSchema)
module.exports = blogModel