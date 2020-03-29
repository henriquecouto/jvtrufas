const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  purchaser: { type: mongoose.SchemaTypes.ObjectId, required: true },
  admin: { type: mongoose.SchemaTypes.ObjectId },
  status: { type: String, enum: ["open", "closed"] },
  registrationDate: { type: Date, default: Date.now() }
});

module.exports = { Chat: mongoose.model("Chat", ChatSchema) };
