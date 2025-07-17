const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connect to mongodb..");
    }
    catch(error){
        console.log(error);
        console.log("error at connecting to the db ");
    }

}
module.exports = connectDb;