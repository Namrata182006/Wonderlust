const Listing = require("../models/listing");



module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
};

module.exports.newListing = async(req,res,next) => {
    let url = req.file.path;
    let filename =  req.file.filename

    // if (!req.body.listing.image.url) {
    // req.body.listing.image.url = undefined;
    // }
    
    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image= {url,filename};
    await newListing.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
};


module.exports.showListing = async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "review",populate: {path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error", "listing you are requested for was deleted!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};


module.exports.editListing = async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing = async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename =  req.file.filename
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success", "Your location updated successfully!");
    res.redirect(`/listings/${id}`)
};

module.exports.deleteListing = async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted successfully!");
    res.redirect("/listings")
};


