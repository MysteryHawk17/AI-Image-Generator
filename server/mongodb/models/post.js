import mongoose from "mongoose"

const PostSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    prompt:{
        type:String,
        required:true
    }, 
    photo:{
        type:String,
        required:true
    }
})
// const PostModel=
export default (mongoose.model('Post',PostSchema))
