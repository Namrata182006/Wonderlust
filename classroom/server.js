const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const path = require("path");
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');


app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));

app.use(session({secret: "itssecret",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.get("/test",(req,res) => {
    res.send("test sucessfull");
});

// app.get("/request",(req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you send the request ${req.session.count} times`);
// });


app.get("/register",(req,res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash('error', 'user not registered');
    }else{
        req.flash('success', 'use register successfully');
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res) => {
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    res.render("hello.ejs",{name: req.session.name})
});







//Cookies

// app.get("/getcookies",(req,res) => {
//     res.cookie("greet","Namaste");
//     res.cookie("madeIn","India");
//     res.send("Cookies is send to getCookies");
// });

// app.use(cookieParser("secretCode"));

// app.get("/verify",(req,res) => {
//     console.log(req.signedCookies);
//     res.send("Verified")
// })

// app.get("/great",(req,res) => {
//     let {name = "Namrata"} = req.cookies;
//     res.send(`hi ${name}`);
// });





app.get("/getSignedCookies",(req,res) => {
    res.cookie("Made_In","India",{signed: true});
    res.send("Signedd cookie send");
});








app.get("/", (req,res) =>{
    console.dir(req.cookies);
    res.send("This is root page");
});


app.use("/users", users);
app.use("/posts",posts);



app.listen(3000, ()=>{
    console.log("Server is listerning to port 3000");
})