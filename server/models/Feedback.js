const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional, for anonymous feedback
  answers: [{
    questionText: { type: String },
    answer: { type: String, required: true },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);