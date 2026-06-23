const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { isLoggedIn, saveOriginalUrl, isOwner } = require("../middleware.js");

const listingController = require("../controllers/users.js");



// router.route("/signUp")
// .get((req,res) => {
//     res.render("users/signUp.ejs");
// })
// .post(wrapAsync(listingController.signUp));



// router.route("/login")
// .get((req,res) => {
//     res.render("users/login.ejs");
// })
// .post(
//     saveOriginalUrl,
//     passport.authenticate("local",{
//     failureRedirect: "/login",
//     failureFlash: true,
// }),
//     wrapAsync(listingController.logIn));





//signUp
router.get("/signUp",(req,res) => {
    res.render("users/signUp.ejs");
});

router.post("/signUp",wrapAsync(listingController.signUp));


//login
router.get("/login",(req,res) => {
    res.render("users/login.ejs");
});

router.post(
    "/login",
    saveOriginalUrl,
    passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true,
}),
    wrapAsync(listingController.logIn));




router.get("/logOut",(req,res,next) => {
    req.logout((err) => {
       if(err){
         return next(err);
       }

       req.flash("success","Loggout successfully!");
       res.redirect("/listings");
});

})


module.exports = router;