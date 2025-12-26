const Review =require("../models/review.js");
const Listing=require("../models/listing.js");

//post review Route
module.exports.creatReview=async(req,res)=>{
   if (!req.body.review) {
      throw new ExpressError(400, "Review data is missing");
    }

   let listing=await Listing.findById(req.params.id);
   let newReview= new Review(req.body.review);
   newReview.author=req.user._id;
   listing.reviews.push(newReview);
   await newReview.save();
   await listing.save();

   req.flash("success","New review created!");
   res.redirect(`/listings/${listing._id}`);

};

//delete review
module.exports.deleteReview=async(req,res)=>{

   let {id, reviewId}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   await Review.findByIdAndDelete(reviewId);
   req.flash("success","Review deleted!");
   res.redirect(`/listings/${id}`);

};