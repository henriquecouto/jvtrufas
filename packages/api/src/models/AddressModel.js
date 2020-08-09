const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true, maxlength: 100 },
  neighborhood: { type: String, required: true, maxlength: 50 },
  landmark: { type: String, required: true, maxlength: 50 },
});

module.exports = {
  Address: mongoose.model("Address", AddressSchema),
  AddressSchema,
};
