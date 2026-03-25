const User = require('../models/user');
const PracticeRecord = require('../models/practiceRecord');

// Get all users with pagination
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    
    const total = await User.countDocuments();
    
    res.json({
      users,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user details with practice statistics
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Get practice statistics
    const practiceStats = await PracticeRecord.aggregate([
      { $match: { user_id: user._id } },
      {
        $group: {
          _id: null,
          total: { $count: {} },
          correct: { $sum: { $cond: [{ $eq: ['$result', true] }, 1, 0] } }
        }
      }
    ]);
    
    // Get error distribution by subject
    const errorDistribution = await PracticeRecord.aggregate([
      { $match: { user_id: user._id, result: false } },
      {
        $lookup: {
          from: 'questions',
          localField: 'question_id',
          foreignField: '_id',
          as: 'question'
        }
      },
      {
        $unwind: '$question'
      },
      {
        $group: {
          _id: '$question.subject',
          count: { $count: {} }
        }
      }
    ]);
    
    res.json({
      user,
      practiceStats: practiceStats[0] || { total: 0, correct: 0 },
      errorDistribution
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user status (ban/unban)
exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};