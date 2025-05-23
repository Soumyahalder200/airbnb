const mongoose =require('mongoose');
const Review = require('./review');
const Schema =mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required :true
    },
    description:{
        type: String,
        required :true
    },
    image:{
        type: String,
        default:"https://plus.unsplash.com/premium_photo-1682377521697-bc598b52b08a?q=80&w=3015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set :(v)=>
            v===""?
            "https://plus.unsplash.com/premium_photo-1682377521697-bc598b52b08a?q=80&w=3015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v
        
    },
    price:{
        type: Number,
        required :true
    },
    location:{
        type: String,
        required :true
    },
    country:{
        type: String,
        required :true
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner: {
        type :Schema.Types.ObjectId,
        ref : "User",
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in :listing.reviews}});
    }
});

const listing =mongoose.model('listing',listingSchema);
module.exports=listing;