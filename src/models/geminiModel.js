const mongoose = require('mongoose');

const geminiSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GeminiHistory', geminiSchema);
