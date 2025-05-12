const listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/expressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");


module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl=req.originalUrl;
    req.flash("error", "you must be login to create a listing");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async(req,res,next)=>{
  let { id } = req.params;
    let findListing= await listing.findById(id);
    if(!findListing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","you are not the owner of this listing");
      return res.redirect(`/listing/${id}`);
    };
    next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errorMsg = error.details.map((el) => el.message).join(",");

    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errorMsg = error.details.map((el) => el.message).join(",");

    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async(req,res,next)=>{
  let { id, reviewId } = req.params;
  console.log(id,reviewId);
    let findReview= await Review.findById(reviewId);
    console.log(findReview);
    if(!findReview.author.equals(res.locals.currUser._id)){
      req.flash("error","you are not the author of this review");
      return res.redirect(`/listing/${id}`);
    };
    next();
};