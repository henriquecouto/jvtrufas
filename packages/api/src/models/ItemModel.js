const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  flavor: { type: String, required: true },
  price: { type: Number, required: true },
  photos: { type: [String] },
  amount: { type: Number },
  available: { type: Boolean },
  registrationDate: { type: Date, default: Date.now() },
});

module.exports = { Item: mongoose.model("Item", ItemSchema), ItemSchema };
