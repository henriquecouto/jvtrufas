const mongoose = require("mongoose");

const EvaluationSchema = new mongoose.Schema({
  stars: { type: Number, enum: [0, 1, 2, 3, 4, 5] },
  comment: { type: String, maxlength: 200 },
  registrationDate: { type: Date, default: Date.now() }
});

module.exports = { Evaluation: mongoose.model("Evaluation", EvaluationSchema) };
