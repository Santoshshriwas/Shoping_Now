const mongoose = require("mongoose");

const Order1Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user model
  items: [
    {
      cloath: { type: mongoose.Schema.Types.ObjectId, ref: "Cloath", required: true }, // Reference to Cloath model
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, default: "Pending", enum: ["Pending", "Processing", "Shipped", "Delivered"] },
  paymentStatus: { type: String, default: "Pending", enum: ["Pending", "Paid"] },
  deliveryAddress: { type: String, required: true },
  orderedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", Order1Schema);

module.exports = Order;
