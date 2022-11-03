const {Schema , model} = require("mongoose");


const CommentSchema = new Schema({
    comment:String,
    date:String,
    user:{ type: Schema.Types.ObjectId, ref: 'user'},
    blog:{ type: Schema.Types.ObjectId, ref: 'blog'}

})
const commentModel = model("comment" , CommentSchema)
module.exports = commentModel