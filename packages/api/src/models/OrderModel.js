const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  purchaser: { type: mongoose.SchemaTypes.ObjectId, required: true },
  items: { type: [mongoose.SchemaTypes.ObjectId], required: true },
  type: { type: String, enum: ["scheduled", "instant"], required: true },
  deliveryDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["cart", "waiting", "delivered", "canceled"],
    required: true,
    default: "cart"
  },
  evaluation: { type: mongoose.SchemaTypes.ObjectId },
  registrationDate: { type: Date, default: Date.now() }
});

module.exports = { Order: mongoose.model("Order", OrderSchema) };
