const validateUserSession=(req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect("/login")
    }
}


const validateAdminSession=(req,res,next)=>{
    if(req.session.admin){
        next()
    }else{
        res.redirect("/admin/login")
    }
}
module.exports={
    validateUserSession,validateAdminSession
}