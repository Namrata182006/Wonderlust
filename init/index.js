const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

main().then(() => {
    console.log("Connected to MongoDB Successfully");
}).catch((err) => {
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}


const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6a26c3f951aac2e24b66c193"}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialised successfully");
}
initDB()