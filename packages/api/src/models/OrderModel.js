const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const { ItemSchema } = require("./ItemModel");
const { AddressSchema } = require("./AddressModel");

const OrderSchema = new mongoose.Schema({
  purchaserId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  orderNumber: { type: Number, required: true },
  items: { type: [ItemSchema], required: true },
  type: { type: String, enum: ["scheduled", "instant"], required: true },
  deliveryDate: { type: Date, required: true },
  address: { type: AddressSchema, required: true },
  payment: { type: String, enum: ["money"], default: "money" },
  status: {
    type: String,
    enum: ["cart", "waiting", "preparing", "delivered", "canceled"],
    required: true,
    default: "cart",
  },
  evaluation: { type: mongoose.SchemaTypes.ObjectId },
  observation: { type: String, maxlength: 200 },
  registrationDate: { type: Date, default: Date.now() },
});

OrderSchema.plugin(autoIncrement.plugin, {
  model: "Order",
  field: "orderNumber",
  startAt: 1000,
  incrementBy: 1,
});

module.exports = { Order: mongoose.model("Order", OrderSchema) };
