const Listing=require("../models/listing")

//index
module.exports.index=async(req,res)=>{
  const allListings=await Listing.find({});
  res.render("listings/index.ejs",{allListings});
};


//new route(render)
module.exports.renderNewForm=(req,res)=>{
res.render("listings/new.ejs");

};

//show route
module.exports.showlisting=async(req,res)=>{
   let {id}=req.params;
  const listing= await Listing.findById(id).populate({path:"reviews", populate:{
   path:"author",
  } ,
}).populate("owner");
  
  if(!listing){
   req.flash("error","listing you request do not exist");
   res.redirect("/listings");
  }
  else res.render("listings/show.ejs",{listing});
  
};

//creat route
module.exports.creatListing=async(req,res,next)=>{
 let url= req.file.path;
 let filename= req.file.filename;

  const newListing=new Listing(req.body.listing);
  newListing.owner=req.user._id;
  newListing.image={url,filename};
  await newListing.save();
  req.flash("success","New listing created!");
  res.redirect("/listings");
  
};

//edit route
module.exports.editListing=async(req,res)=>{
   let {id}=req.params;
  const listing= await Listing.findById(id);
  if(!listing){
   req.flash("error","listing you request do not exist");
   res.redirect("/listings");
  }
 else{
   let originalImageUrl=listing.image.url;
   originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
   res.render("listings/edit.ejs",{listing,originalImageUrl});
 }
};

module.exports.updateListing=async(req,res)=>{
   let{id}=req.params;
   let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

if(typeof req.file !=="undefined"){
   let url= req.file.path;
   let filename= req.file.filename;
   listing.image={url,filename};
   await listing.save();
}

   req.flash("success"," Listing updated!");
   res.redirect(`/listings/${id}`);

};

//delete route
module.exports.deleteListing=async(req,res)=>{
   let {id}=req.params;
   const deletedListing=await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success"," Listing deleted!");
   res.redirect("/listings");
};
