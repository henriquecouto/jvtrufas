const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50, unique: true },
  flavor: { type: String, required: true },
  photos: { type: [String] },
  amount: { type: Number },
  registrationDate: { type: Date, default: Date.now() },
});

module.exports = { Item: mongoose.model("Item", ItemSchema), ItemSchema };
