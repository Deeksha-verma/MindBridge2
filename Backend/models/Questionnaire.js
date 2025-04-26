const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema({
  assessmentType: {
    type: String,
    enum: ["STRESS", "DEPRESSION", "ANXIETY"],
  },
  response: [
    {
      question: String,
      answer: String,
    },
  ],
  analysis: String,
  suggestion: String,
});

module.exports = mongoose.model("Questionnaire", questionnaireSchema);
