const mongoose = require('mongoose');

const practiceRecordSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  result: {
    type: Boolean,
    required: true
  },
  submit_time: {
    type: Date,
    default: Date.now
  },
  user_answer: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('PracticeRecord', practiceRecordSchema);