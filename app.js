const express = require("express");
const app = express();
const dbConnection = require("../Backend/config/connectDb");
dbConnection();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

var routes = require("../Backend/Routes/index");
app.use(express.json());
app.use('/auth',routes);
app.listen(port ,()=>{
    console.log(`Server is listning to port ${port}`);
})
module.exports = app;