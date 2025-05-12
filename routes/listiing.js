const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedin,
    validateListing,
    wrapAsync(listingController.createListing)
  );

router.get("/new", isLoggedin, listingController.renderNewForm);
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .delete(isLoggedin, isOwner, wrapAsync(listingController.deleteListing))
  .put(
    isLoggedin,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  );
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);
module.exports = router;
