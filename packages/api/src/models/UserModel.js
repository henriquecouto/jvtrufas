const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { AddressSchema } = require("../models/AddressModel");

const UserSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["purchaser", "admin"],
    required: true,
    default: "purchaser",
  },
  addresses: { type: [AddressSchema] },
  name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, lowercase: true },
  whatsapp: { type: String, maxlength: 12, required: true },
  password: { type: String, required: true, select: false },
  photo: { type: String },
  registrationDate: { type: Date, default: Date.now() },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = { User: mongoose.model("User", UserSchema) };
