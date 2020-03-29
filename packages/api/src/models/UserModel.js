const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["purchaser", "admin"],
    required: true,
    default: "purchaser"
  },
  name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String },
  registrationDate: { type: Date, default: Date.now() }
});

module.exports = { User: mongoose.model("User", UserSchema) };
