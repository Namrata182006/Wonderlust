// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js")

// main().then(() => {
//     console.log("Connected to MongoDB Successfully");
// }).catch((err) => {
//     console.log(err);
// })

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
// }

// const initDB = async() =>{
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({...obj, owner: "6a26c3f951aac2e24b66c193"}))
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialised successfully");
// }
// initDB()



if(process.env.NODE_ENV != "Production"){
    require("dotenv").config({ path: "../.env" });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const ATLASDB_URL = process.env.ATLASDB_URL;

main()
.then(() => {
    console.log("Connected to MongoDB Atlas Successfully");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(ATLASDB_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    const sampleData = initData.data.map((obj) => ({
        ...obj,
        owner: new mongoose.Types.ObjectId("6a39f407b5ccc937ba48dd14")
    }));

    await Listing.insertMany(sampleData);

    console.log("Data initialized successfully");
    mongoose.connection.close();
};

main().then(() => {
    initDB();
});