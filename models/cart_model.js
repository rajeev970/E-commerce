const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    items:{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        }
    }

},{
    timestamps:true
})
const cartModel = mongoose.model("cartModel",cartSchema);
module.exports = cartModel;