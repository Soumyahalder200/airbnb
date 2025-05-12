const { date, ref } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reviewSchema = new Schema({
    comment :String,
    rating:{
        type:Number,
        max:5,
        min:1,
    },
    cratedAt:{
        type: Date,
        default:Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

module.exports=mongoose.model("Review",reviewSchema);