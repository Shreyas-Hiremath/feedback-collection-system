// server/models/Form.js
const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{
    text: { type: String, required: true },
  }],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // This is all Mongoose needs
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);