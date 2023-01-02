const express=require('express')
const { findAllUsers,AddUser, findUserWithName, findUser, deleteUserWithId } = require('../controllers/userControllers')
const router=express.Router()
const {validateAdminSession}=require("../controllers/validateSession")
const user = require('../models/user')

//home section 
router.get('/home',validateAdminSession,async(req,res)=>{
    const users=await findAllUsers()
    res.render("admin",{admin:true,users})
})

//signup section
router.get('/signup',(req,res)=>{
    res.send("admin")
})


//login page GET method
router.get('/login',(req,res)=>{
    res.render('adminLogin',{error:req.session.Err})
})


//login user POST method
router.post('/loginUser', (req, res) => {
    const { email, password } = req.body
    findUser(req.body).then((user)=>{
        if(user.role==="admin"){
            req.session.admin={
                id:user._id,
                role:user.role
            }
            res.redirect('/admin/home')
        }else{
            req.session.Err="you are not a privileged user"
            res.redirect('/admin/login')
        }
    }).catch((err)=>{
        req.session.Err="invalid user credentials"
        res.redirect('/admin/login')
    })
})

router.get('/add-user',validateAdminSession,(req,res)=>{
    res.render("addUser",{admin:true,error:req.session.Err})
})



router.post("/addUser",validateAdminSession,(req,res)=>{
    AddUser(req.body).then((user)=>{
        if(user){
            req.session.Err="user added succcess fully"
            res.redirect("/admin/add-user")
        }else{
            req.session.Err="failed to add user"
            res.redirect('/admin/add-user')
        }
    }).catch(()=>{
        req.session.Err="something went wrong"
        res.redirect('/admin/add-user')
    })
})


router.get("/searchUser",validateAdminSession,async(req,res)=>{
    let users=await findUserWithName(req.query)
    res.render('admin',{admin:true,users,message:(users.length>0)? null :"No user found"})
})


router.get('/edit-user/:id',validateAdminSession,(req,res)=>{
        user.find({_id:req.params.id}).then((user)=>{
            res.render('edituser',{id:req.params.id,user:user[0]})
        }).catch((err)=>{
            res.redirect('/admin/home')
        })
})

router.post('/edit-user/:id',validateAdminSession,(req,res)=>{
    user.updateOne({_id:req.params.id},{$set:{...req.body}}).then((result)=>{
        res.redirect('/admin/home')
    })
})

router.get('/deleteUser/:id',validateAdminSession,(req,res)=>{
    console.log(req.params);
    deleteUserWithId(req.params).then(()=>{
        res.redirect('/admin/home')
    })
})
router.get('/signout',(req,res)=>{
    req.session.admin=null;
    res.redirect('/')
})
module.exports=router