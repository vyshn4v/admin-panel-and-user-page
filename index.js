const express=require("express");
const app=express();
const path=require("path");
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const hbs =require('hbs')
const userRouter=require("./routes/user")
const adminRouter=require('./routes/admin')
const session=require('express-session')
const cookieParser=require('cookie-parser')


app.listen(3000,()=>{
    console.log("app is running on port 3000");
})
mongoose.set('strictQuery',false)
mongoose.connect('mongodb://127.0.0.1:27017/dummy').then(()=>{
    console.log("databse successfully connected")
})
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cookieParser())
app.use(session({
    secret:"secret key",
    cookie:{maxAge:600000},
    resave:false,
    saveUninitialized:false
}))
app.use(bodyParser.json())
app.use(express.static(__dirname+"/public"))
app.set('views',path.join(__dirname,"views"))
app.set('view engine','hbs')
hbs.registerPartials(__dirname+"/views/partials/")
app.use((req,res,next)=>{
    res.set('cache-control',"no-cache,private,no-store,must-revalidate,max-stable=0,post-check=0,precheck=0")
    next()
})
app.use("/",userRouter)
app.use("/admin",adminRouter)