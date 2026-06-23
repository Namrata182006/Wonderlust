const express = require("express");
const route = express.Router();




//index route
route.get("/",(req,res) => {
    res.send("GET index page");
});
//show  route
route.get("/:id", (req,res) => {
    res.send("GET for show page");
});


//post user
route.post("/" ,(req,res) =>{
    res.send("Post for show page")
});


//delete route
route.delete("/:id", (req,res) => {
    res.send("Delete for user id")
});


module.exports = route;