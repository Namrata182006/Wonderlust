const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const reviewSchema  = require("../reviewSchema.js")
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, saveOriginalUrl, isOwner, isReviewAuthor } = require("../middleware.js");


const listingController = require("../controllers/reviews.js");

//validate new listing form
const validateListing = (req,res,next) =>{
    const result = listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400, result.error)
    }else{
        next();
    }
};


//validate reviews
const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


//Review Post route
router.post("/:id/review",isLoggedIn, validateReview, wrapAsync(listingController.createReview));

//Delete Review
router.delete("/:id/review/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(listingController.deleteReview));


module.exports = router;