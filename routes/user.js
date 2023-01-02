const express = require("express")
const router = express.Router();
const user = require("../models/user")
const { AddUser, findUser } = require('../controllers/userControllers');
const { validateUserSession } = require('../controllers/validateSession');
const e = require("express");
/// Home page
router.get("/",validateUserSession, (req, res) => {
    let products = [{
        _id: 1
    }, {
        _id: 2
    }, {
        _id: 3
    }, {
        _id: 3
    }, {
        _id: 3
    }, {
        _id: 3
    }, {
        _id: 3
    }, {
        _id: 3
    }]
    res.render("home", { products, user: true })
})
/// User signup
router.get("/signup", (req, res) => {
    if(req.session.user){
        res.redirect('/')
    }else{
        res.render('signup', { title: "signup page", error: req.session.loginErr })//render signup page
        req.session.loginErr = null
    }
})

router.post("/signup", (req, res) => {
    const { firstName, lastName, email, password, role } = req.body
    try {
        user.findOne({ email: email }).then(async (user) => {
            if (!user) {
                if (firstName && lastName && email && password) {
                    AddUser(req.body).then((result) => {
                        // console.log(result);
                        req.session.user = {
                            id:result._id,
                            role: result.role
                        }
                        res.redirect('/')
                    }).catch((err)=>{
                        console.log(err);
                    })
                } else {
                    req.session.loginErr = "Enter the fields correct"
                    res.redirect('/signup')
                }
            }
            else {
                req.session.loginErr = "Email already taken"
                res.redirect('/signup')
            }
        })
    } catch (err) {
        console.log(err);
    }
})

router.get("/login", (req, res) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        res.render('login', { title: "login Page",error:req.session.loginErr })
        req.session.loginErr=null
    }
})


router.post('/loginUser', (req, res) => {
    const { email, password } = req.body
    findUser(req.body).then((user)=>{
        if(user.role==="user"){
            req.session.user={
                id:user._id,
                role:user.role
            }
            res.redirect('/')
        }else{
            req.session.loginErr="you are a privileged user"
            res.redirect('/login')
        }
    }).catch((err)=>{
        req.session.loginErr="invalid user credentials"
        res.redirect('/login')
    })
})


router.get("/signout", (req, res) => {
    req.session.destroy()
    res.redirect("/admin/login")
})
module.exports = router;