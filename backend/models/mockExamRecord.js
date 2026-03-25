const mongoose = require('mongoose');

const mockExamRecordSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MockExam',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  rank: {
    type: Number,
    default: 0
  },
  submit_time: {
    type: Date,
    default: Date.now
  },
  answers: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

mockExamRecordSchema.index({ user_id: 1, exam_id: 1 });

module.exports = mongoose.model('MockExamRecord', mockExamRecordSchema);