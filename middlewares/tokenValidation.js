const jwt = require("jsonwebtoken");
const userModel = require("../models/user_model");

const tokenValidation = async(req,res,next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(403).json({message:"Not authorized"});
        }
        else{
            const token = authHeader.split(" ")[1];
            jwt.verify(token,process.env.TOKEN,(err,decode)=>{
                if(err){
                    return res.status(400).json({message:err});
                }
                else{
                    console.log(decode);
                    req.user = decode;
                    console.log("end of token validation");
                    next();
                }
            }
        )

        }
    }
    catch(error){
        return res.json({error:error});
    }
}
const adminTokenValidataion = async (req,res,next)=>{
    try{const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).json({message:"Token is Not found.."});
    }
    else{
        const token = authHeader.split(" ")[1];
         jwt.verify(token,process.env.TOKEN,async(error,decode)=>{
            if(error){
                return res.status(401).json({error:error});
            }
            else{
                console.log("Hi Rajeev");
                req.user = decode;
                console.log(decode);
                const userdata = await userModel.findById(decode.userId);
                console.log(userdata);
                if(userdata.role === "admin"){
                    console.log("admin data is found..");
                    next();
                }
                else{
                    return res.status(403).json({message:"authorization-access denied."});
                }

            }
        });
    }}
    catch(err){
        return res.status(400).json(err);
    }
}
module.exports = {tokenValidation,adminTokenValidataion};