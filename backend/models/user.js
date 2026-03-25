const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  nickname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student'
  },
  status: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);