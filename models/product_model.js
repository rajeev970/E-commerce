const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    countInStock:{
        type:Number,
        required:false,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:false
    }
},{
    timestamps:true,
})
const productmodel =mongoose.model("product",productSchema);
module.exports = productmodel;