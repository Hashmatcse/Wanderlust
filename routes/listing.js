const express=require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync");
const ExpressError = require("../utils/ExpressError");
const {listingSchema}=require("../schema");
const Listing=require("../models/listing");
const {isLoggedIn}=require("../middleware.js");
const {isOwner}=require("../middleware.js");
const {validateListing}=require("../middleware.js");
const listingController=require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

 

//index route
router.get("/",wrapAsync(listingController.index));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//show route
router.get("/:id",wrapAsync(listingController.showlisting));

//creat route
router.post("/",isLoggedIn,upload.single('listing[image]'),
wrapAsync(listingController.creatListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

//update route
router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id", isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

module.exports=router;


//we can writethe function of the same paths in one path this will out code more compact and readable
//i have not done here because i find this one more readable
