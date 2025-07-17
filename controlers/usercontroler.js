const mongoose = require("mongoose");
const userModel = require("../models/user_model");
const productModel = require("../models/product_model");
const orderModel = require("../models/Order_model");
const cartModel = require("../models/cart_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const registration = async(req,res)=>{
    try{const{name,mail,password,role}=req.body;
    if(!name || !mail || !password || !role){
       return res.status(400).json({message:"all fills are mandatory"});
    }else{
        const isExist = await userModel.find({mail:mail});
        if(isExist.length>0){
            return res.status(404).json({message:" bro User is already exits.."});
        }else{
            const hashpassword = await bcrypt.hash(password,5);

            const userdata = await new userModel({
                name:name,
                mail:mail,
                password:hashpassword,
                role:role
            })
            const saveUserData = await userdata.save();
            console.log("succefully data is stored in db..");
            const token = jwt.sign({
                userId:userdata._id
            },process.env.TOKEN,{
                expiresIn :'1week'
            });
            res.status(200).json({message:"JWT is formed",token:token});
        }
    }
}
catch(error){
    console.log(error);
    res.status(400).json({error:"error at registration.."});
}};
const login = async(req,res)=>{
   try{ const{mail,password} = req.body;
    if(!mail || !password){
        return res.status(400).json({message:"fill the details.."});
    }
    else{
        const user = await userModel.findOne({mail:mail});
        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign({
                userId:user._id
            },process.env.TOKEN,{
                expiresIn : "1week"
            })
            res.status(201).json({token:token});
        }else{
            return res.status(401),json({message:"Invalid User.."});
        }
    }}
    catch(err){
        return res.status(400).json({error:"error at login.."});
    }
}
const addProducts = async(req,res)=>{
    console.log("hii bro");
    try{
        const{name,discrtion,price,countInStock,category,url}=req.body;
        if(!name || !price || !category ){
            return res.status(401).json({message:"fill all details.."});
        }
        else{
            console.log("hii");
            const productdata = new productModel({
                name:name,
                discrtion:discrtion,
                price:price,
                countInStock:countInStock,
                category:category,
                url:url
            })
            const saveProductdata = await productdata.save();
            res.status(200).json({message:"succesfully product is added.."});
        }
    }
    catch(error){
        return res.status(401).json({message:error});
    }
}
const getProducts = async(req,res)=>{
    try{
        const {countInStock} = req.query;
        console.log("at getproducts");
        const productData =await productModel.find();
        const pData = productData.filter((a)=>{
            if(a.countInStock>countInStock){
                return true;
            }
        })
        console.log(pData);
        res.status(200).json(productData);
    }catch(error){
        res.status(500).json(error);
    }
}
const getOrders = async(req,res)=>{
    try{
        const ordersData = await orderModel.find();
        res.status(200).json({data:ordersData});
    }catch(error){
        res.status(500).json({message:error});
    }
}
const placeOrder = async(req,res)=>{
    try{
        const {productId,quantity,totalAmount}=req.body;
        if(!productId || !quantity || !totalAmount){
            return res.status(400).json("Fill the details");
        }
        const {user}=req;
        console.log("at placeOrder");
        console.log(user);
        const userData = await userModel.findOne({_id:user.userId});
        console.log("manoja");
        console.log(userData);
        const order = new orderModel({
            userId:userData._id,
            items:{
                productId:productId,
                quantity:quantity,
                totalAmount:totalAmount
            }
        })
        console.log("Order");
        console.log(order);
        const saveOrderdata = await order.save();
        console.log(saveOrderdata);
        res.status(201).json("successfully orderd..");
    }catch(error){
    return res.status(400).json(error);
}
}
const addcart = async(req,res)=>{
    try{
        console.log("hii");
        const{productId,quantity}=req.body;
        const{user}=req;
        if(!productId || !quantity){
            return res.status(400).json("Fill all the details..");
        }
        const userdata = await userModel.findById(user.userId);
        console.log(userdata);
        const cartData = await new cartModel({
            userId:userdata._id,
            items:{
                productId:productId,
                quantity:quantity
            }
        })
        console.log(cartData);
        const savecartData = await cartData.save();
        console.log(savecartData);
        res.status(200).json(savecartData);
    }catch(error){
        return res.status(401).json(error);
    }
}
const updateOrderStatus = async(req,res)=>{
    try{
        console.log("admin at update OrderStatus");
        const{orderId,status} = req.body;
        if(!orderId || !status){
            return res.status(400).json("fill all the details");
        }
        const orderData = await orderModel.findById(orderId);
        console.log(orderData);
        if(!orderData){
            return res.status(404).json("OrderData is not found..");
        }
        else{
            orderData.items.orderStatus = status;
            const update  = await orderData.save();
            res.status(202).json(update);
        }
    }catch(error){
        return res.status(402).json(error);
    }
}
const updatePaymentStatus = async(req,res)=>{
    try{
        const{orderId,status} = req.body;
        const orderdata = await orderModel.findById(orderId);
        if(!orderdata || !status){
            return res.status(404).json({message:"fill all the details.."});
        }
        orderdata.items.paymentStatus = status;
        console.log(orderdata);
        const update = await orderdata.save();
        res.status(202).json(update);
    }
    catch(error){
        return res.status(400).json(error);
    }
}
const getcart = async(req,res)=>{
    try{
        const {user} = req;
        const userdata = await userModel.findById(user.userId); 
        console.log(userdata);
        const cartdata = await cartModel.find({userId:userdata._id})
        if(!userdata || !cartdata){
            return res.status(404).json("NOt found..");
        }
        res.status(200).json(cartdata);
    }catch(err){
        return res.status(401).json(err);
    }
}
const deleteCart = async(req,res)=>{
    try{
        const {cartId}=req.params;
        const deleteitem = await cartModel.deleteOne({_id:cartId});
        console.log(deleteitem);
        res.status(200).json({message:"deleted the item in cart"});
    }
    catch(error){
        return res.status(400).json({message:"error at deletecart.."});
    }
}
module.exports = {
    registration,
    login,
    addProducts,
    getProducts,
    getOrders,
    placeOrder,
    addcart,
    updateOrderStatus,
    updatePaymentStatus,
    getcart,
    deleteCart
};