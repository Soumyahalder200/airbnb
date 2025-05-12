const mongoose =require('mongoose');
const initdata =require('./data.js');
const listing =require('../models/listing.js');

const mongoUrl ="mongodb://127.0.0.1:27017/Wanderlust";

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(mongoUrl);    
}


const initdb= async()=>{
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner: "6757a912bb6cc7c9b63da84b"}));
    await listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initdb();