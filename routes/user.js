const express=require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync");
const passport=require("passport");
const {saveRedurectUrl}=require("../middleware.js");
const controllerUser=require("../controller/user.js");


//signup render
router.get("/signup",controllerUser.signupRender);

//signup post
 router.post("/signup", (controllerUser.signupPost));

//login render
router.get("/login",controllerUser.loginRender);


//login post
router.post("/login",saveRedurectUrl,passport.authenticate("local",
    {failureRedirect:"/login",
    failureFlash:true}),
    controllerUser.loginPost);

//logout
router.get("/logout",controllerUser.logout);

module.exports=router;
