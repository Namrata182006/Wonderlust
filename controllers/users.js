const Review = require("../models/reviews.js");
const User = require("../models/users.js");
const Listing = require("../models/listing.js");


module.exports.signUp = async(req,res) => {
    try{
    let{username,email,password} = req.body;
    const newUser = new User({email,username});
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
        if(err){
            return next(err);
        }
         console.log(registerUser);
        req.flash("success","User register successfully");
        res.redirect("/listings");
    })
    }
    catch(err){
        req.flash("error","User is already registerd!");
        res.redirect("/signUp");
    }
};


module.exports.logIn = async(req,res) => {
        req.flash("success","User loggined successfully");
        let redirectUrl =  res.locals.redirectedUrl || "/listings"
        res.redirect(redirectUrl);
}