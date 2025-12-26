const User=require("../models/user");


module.exports.signupRender=(req,res)=>{
res.render("users/signup.ejs");
};

module.exports.signupPost=async(req,res,next)=>{
    try{
    let {username,email,password}=req.body;
    const newUser= new User({
    email:email,
    username:username,
});

const registeredUser=await User.register(newUser,password);
req.login(registeredUser,((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    }))

}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
};

module.exports.loginRender=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginPost=async(req,res)=>{
    req.flash("success","you are loggedin");
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are loged out now");
        res.redirect("/listings");
    });
};