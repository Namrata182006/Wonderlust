const mongoose = require("mongoose");
const listingSchema = require("../schema");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listeningSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    review: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
});

listeningSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.review}})
    }
})

const Listing = mongoose.model("Listing", listeningSchema)
module.exports = Listing;