const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const listingSchema  = require("../schema.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, saveOriginalUrl, isOwner, isReviewAuthor } = require("../middleware.js");

const {storage} = require("../cloudConfig.js");

const multer  = require('multer')
const upload = multer({storage})


const listingController = require("../controllers/listings.js")


//validate new listing form
const validateListing = (req,res,next) =>{
    const result = listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400, result.error)
    }else{
        next();
    }
};

// router.route("/")
// .get(wrapAsync(listingController.index))   //index route
// .post(validateListing, wrapAsync(listingController.newListing));  //new post route


// router.route("/:id")
// .get(wrapAsync(listingController.showListing))     //show route
// .put(isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));   //update route



// Index route
router.get("/",wrapAsync(listingController.index));


//New Route
router.get("/new",isLoggedIn,(req,res) => {
    res.render("listings/new.ejs");
});
router.post("/",isLoggedIn,upload.single("listing[image][url]"),validateListing ,wrapAsync(listingController.newListing));



//Show Route
router.get("/:id",wrapAsync(listingController.showListing));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));

//Update Route
router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image][url]"),validateListing, wrapAsync(listingController.updateListing));


//delete Route
router.get("/:id/delete",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));





module.exports = router;