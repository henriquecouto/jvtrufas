const mongoose = require("mongoose");
const { ItemSchema } = require("./ItemModel");
const { AddressSchema } = require("./AddressModel");

const OrderSchema = new mongoose.Schema({
  purchaserId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  items: { type: [ItemSchema], required: true },
  type: { type: String, enum: ["scheduled", "instant"] },
  deliveryDate: { type: Date },
  address: { type: AddressSchema },
  payment: { type: String, enum: ["money"], default: "money" },
  status: {
    type: String,
    enum: ["cart", "waiting", "preparing", "delivered", "canceled"],
    required: true,
    default: "cart",
  },
  evaluation: { type: mongoose.SchemaTypes.ObjectId },
  registrationDate: { type: Date, default: Date.now() },
});

module.exports = { Order: mongoose.model("Order", OrderSchema) };
