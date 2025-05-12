const listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListing = await listing.find();
  res.render("listing.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
  res.render("newlist.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const showlist = await listing
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!showlist) {
    req.flash("error", "listing you requested for does not exit!");
    res.redirect("/listing");
  }
  res.render("showlist.ejs", { showlist });
};

module.exports.createListing = async (req, res) => {
  const newListing = new listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "new listing created");
  res.redirect("/listing");
};
module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    const deleteList = await listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted");
    res.redirect("/listing");
  }

module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const editList = await listing.findById(id);
    if (!editList) {
      req.flash("error", "listing you requested for does not exit!");
      res.redirect("/listing");
    }
    res.render("editlist.ejs", { editList });
  }  

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let neweditList = req.body.listing;
    let findListing = await listing.findById(id);
    if (!findListing.owner._id.equals(res.locals.currUser._id)) {
      req.flash("error", "you don't have permission to edit");
      return res.redirect(`/listing/${id}`);
    }
    let newListing = await listing.findByIdAndUpdate(
      id,
      { ...neweditList },
      { new: true }
    );
    req.flash("success", "listing updated");
    res.redirect(`/listing/${id}`);
  }  