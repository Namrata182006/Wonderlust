if(process.env.NODE_ENV != "Production"){
    require('dotenv').config()
}
console.log(`Hello ${process.env.NAME}`)


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
var session = require('express-session');
const MongoStore = require('connect-mongo').default;
var flash = require('connect-flash');
const passport = require("passport");
const localStratergy = require("passport-local");
const User = require("./models/users.js");

//requirre routers
const listings = require("./routes/listings.js");
const reviews = require("./routes/reviews.js");
const usersRoute = require("./routes/users.js");


app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")))


//require mongoo

const ATLASDB_URL = process.env.ATLASDB_URL
main().then(() => {
    console.log("Connected to MongoDB Successfully");
}).catch((err) => {
    console.log(err);
});

async function main() {
  await mongoose.connect(ATLASDB_URL);
}



//connect mongo to store temprrory data on mongo atlas
const store = MongoStore.create({
    mongoUrl: ATLASDB_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error" ,(error) =>{
    console.log("ERROR in mongoDB", error);
})

//express session
app.use(session({
    store,
    secret: process.env.SECRET,
    resave:false, 
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
}
));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/demoUser",async(req,res) => {
    let fakeUser = new User({
        email: "Student@gmail.com",
        username: "student"
    });
    let registerUser = await User.register(fakeUser,"Helloworld");
    res.send(registerUser);
})


//root page
// app.get("/", (req,res) => {
//     res.send("Hi, i am root page")
// });

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; 
    next();
})

//use routers
app.use("/listings", listings);
app.use("/listings", reviews);
app.use("/",usersRoute)


//error handling middleware
app.use((req,res,next) => {
    next(new ExpressError(404,"Page not found"));
});

app.use((err,req,res,next) => {
    let{status=500, message="Something went wrong"} = err;
    res.render("error.ejs",{message});
})


//server
app.listen(8080, () => {
    console.log("server is listening to port 8080");
})

