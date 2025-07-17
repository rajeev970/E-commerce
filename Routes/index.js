const express = require("express");
const{tokenValidation,adminTokenValidataion} = require("../middlewares/tokenValidation");
const {
        registration,
        login,
        addProducts,
        getProducts,
        getOrders,
        placeOrder,
        addcart,
        updatePaymentStatus,
        updateOrderStatus,
        getcart,
        deleteCart
    } =require("../controlers/usercontroler");
var routes = express.Router();
routes.post("/registration",registration);
routes.post("/login",login);
//user
routes.get("/user/get-products",tokenValidation,getProducts);
routes.post("/user/placeorder",tokenValidation,placeOrder);
routes.post("/user/addcart",tokenValidation,addcart);
routes.get("/user/get-cart",tokenValidation,getcart);

//admin
routes.get("/admin/get-orders",adminTokenValidataion,getOrders);
routes.post("/admin/addProduct",adminTokenValidataion,addProducts);
routes.put("/admin/updatepaymentstatus",adminTokenValidataion,updatePaymentStatus);
routes.put("/admin/updateorderstatus",adminTokenValidataion,updateOrderStatus);
routes.delete("/user/deletecart/:cartId",tokenValidation,deleteCart);
module.exports= routes;