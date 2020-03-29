const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.SchemaTypes.ObjectId, required: true },
  content: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now() }
});

module.exports = { Message: mongoose.model("Message", MessageSchema) };
