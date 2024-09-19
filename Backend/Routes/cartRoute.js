const express=require("express");
const { addToCart, getCart, removeFromCart }=require("../Controllers/cartController");

const authMiddleware = require("../Middilware/authMiddleware");
const cartRouter = express.Router();

cartRouter.post("/get",authMiddleware,getCart);
cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);

module.exports=cartRouter;