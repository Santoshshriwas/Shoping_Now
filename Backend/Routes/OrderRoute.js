const express = require("express");
const { listOrders, placeOrder,updateStatus,userOrders, verifyOrder } = require("../Controllers/OrderController");
const authMiddleware = require("../Middilware/authMiddleware");

const orderRouter = express.Router();

orderRouter.get("/list",listOrders);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/status",updateStatus);
orderRouter.post("/verify",verifyOrder);

module.exports= orderRouter;