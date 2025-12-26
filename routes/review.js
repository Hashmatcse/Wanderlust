const express=require("express");
const router = express.Router({mergeParams:true});//to let the parameter that is in the parent(app.js) folder be usednin this file 
const wrapAsync = require("../utils/wrapasync");
const ExpressError = require("../utils/ExpressError");

const Review =require("../models/review");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn}=require("../middleware.js");
const {isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controller/review.js");


//post review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.creatReview));


//delete review route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));
module.exports=router;

