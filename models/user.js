const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
    firstName:{type:String,require},
    lastName:{type:String,require},
    email:{type:String,require,unique:true},
    password:{type:String,require},
    role:{type:String,require,default:"user"}
},{timestamps:true})


module.exports=mongoose.model("users",userSchema)