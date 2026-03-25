const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  options: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  answer: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  question_type: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  source: {
    type: String,
    default: '模拟题'
  },
  status: {
    type: Number,
    default: 1
  },
  analysis: {
    type: String,
    default: ''
  }
});

questionSchema.index({ subject: 1, question_type: 1 });

module.exports = mongoose.model('Question', questionSchema);