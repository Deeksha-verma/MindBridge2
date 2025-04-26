import mongoose from "mongoose";

const questionnaireSchema = new mongoose.Schema({
  response: [
    {
      question: String,
      answer: String,
      scorer: Number,
    },
  ],
  analysis: String,
  suggestion: String,
});

module.exports = mongoose.model("Questionnaire", questionnaireSchema);
