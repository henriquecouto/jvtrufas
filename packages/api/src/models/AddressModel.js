const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true, maxlength: 50, minlength: 5 },
  neighborhood: { type: String, required: true, maxlength: 20 },
  landmark: { type: String, required: true, maxlength: 30 },
});

module.exports = {
  // Address: mongoose.model("Address", AddressSchema),
  AddressSchema,
};
