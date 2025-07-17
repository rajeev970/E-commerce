const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
        },
        totalAmount:{
            type:Number,
            required:true
        },
        paymentStatus:{
            type:String,
            enum:['pending','paid'],
            default:'pending'
        },
        orderStatus:{
            type:String,
            enum:['processing','shipped','delivered'],
            default:'processing'
        }
    }
},{
    timestamps:true
})
const orderModel = mongoose.model("orderModel",orderSchema);
module.exports = orderModel;