const express  = require("express");
const route = express.Router();


//Posts


//index 
route.get("/",(req,res) => {
    res.send("GET index page");
});
//show  
route.get("/:id", (req,res) => {
    res.send("GET for show page");
});

//post 
route.post("/" ,(req,res) =>{
    res.send("Post for show page")
});

//delete 
route.delete("/:id", (req,res) => {
    res.send("Delete for user id")
});

module.exports = route;