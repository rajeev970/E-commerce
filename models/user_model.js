const mongoose = require("mongoose");

const userSchem = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    mail:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:'customer'
    },
},{
    timestamps:true
});
const userModel = mongoose.model("user",userSchem);
module.exports = userModel;