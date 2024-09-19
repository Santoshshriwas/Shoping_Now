const Order = require("../Models/order1Model");
const Cloath = require("../Models/CloathModel");

// Add a new order
const addOrder = async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items in the order" });
    }

    let totalAmount = 0;

    // Calculate total order amount
    for (const item of items) {
      const cloath = await Cloath.findById(item.cloath);
      if (!cloath) {
        return res.status(404).json({ error: "Cloath not found" });
      }
      totalAmount += cloath.price * item.quantity;
    }

    const newOrder = new Order({
      user: req.user._id,  // Assuming req.user is set (with authentication middleware)
      items,
      totalAmount,
      deliveryAddress,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Error placing order" });
  }
};

// Get all orders of the logged-in user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.cloath", "name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user orders" });
  }
};

// Get all orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.cloath", "name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching all orders" });
  }
};

module.exports = {
  addOrder,
  getUserOrders,
  getAllOrders,
};
