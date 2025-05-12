const Review = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.createReview=async (req, res) => {
    let reviewListing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author =req.user._id;
    reviewListing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await reviewListing.save();
    req.flash("success","new review created");
    res.redirect(`/listing/${reviewListing.id}`);
  }

  module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted");
    res.redirect(`/listing/${id}`);
  }