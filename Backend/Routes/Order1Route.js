const express = require("express");
const router = express.Router();
const { addOrder, getUserOrders, getAllOrders } = require("../Controllers/OrderCloath");
const authMiddleware = require("../Middilware/authMiddleware"); // Assuming you have authentication middleware

// POST route to add a new order (Authenticated users)
router.post("/add", authMiddleware, addOrder);

// GET route to fetch orders of the logged-in user
router.get("/user-orders", authMiddleware, getUserOrders);

// GET route to fetch all orders (Admin only)
router.get("/all-orders", authMiddleware, isAdmin, getAllOrders);

module.exports = router;
