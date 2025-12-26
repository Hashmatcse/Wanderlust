const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://hashmat26:Hashmat&Atlas@cluster0.mwwidg4.mongodb.net/?appName=Cluster0";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL); 
} 

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "694537cdc6066879dbdddd3f"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
