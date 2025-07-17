const mongoose = require("mongoose");

const categorySchema = new mongoose.model({
    name:{
        type:String,
        required:true
    },
},{
    timestams:true
})
const categoryModel = mongoose.model("categoryModel",categorySchema);
module.exports = categoryModel