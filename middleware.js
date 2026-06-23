const Listing = require("./models/listing");
const Review = require("./models/reviews.js");


function isLoggedIn(req,res,next){
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "To add new listing you must be login");
        return res.redirect("/login");
    };
    next();
};

function saveOriginalUrl(req,res,next){
    if(req.session.redirectUrl){
        res.locals.redirectedUrl = req.session.redirectUrl;
    }
     next();
};

async function isOwner(req,res,next){
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)){
        req.flash("error", "You dont have access!");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

async function isReviewAuthor(req,res,next){
    let{id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not author!");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports = {
    isLoggedIn,
    saveOriginalUrl,
    isOwner,
    isReviewAuthor
};