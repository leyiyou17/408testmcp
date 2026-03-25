const mongoose = require('mongoose');

const mockExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  subject_scope: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  question_rule: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Question',
    default: []
  },
  status: {
    type: String,
    enum: ['未开始', '进行中', '已结束'],
    default: '未开始'
  }
});

module.exports = mongoose.model('MockExam', mockExamSchema);