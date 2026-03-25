const Question = require('../models/question');
const PracticeRecord = require('../models/practiceRecord');

// Get subject list
exports.getSubjects = async (req, res) => {
  try {
    const subjects = [
      { id: '1', name: '数据结构' },
      { id: '2', name: '计组' },
      { id: '3', name: '操作系统' },
      { id: '4', name: '计算机网络' }
    ];
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get questions by subject and type
exports.getQuestionsBySubject = async (req, res) => {
  try {
    const { subject, question_type, page = 1, limit = 10, random = false } = req.query;
    
    const filter = { status: 1 };
    if (subject) filter.subject = subject;
    if (question_type) filter.question_type = question_type;
    
    let questions;
    if (random) {
      // Get random questions
      const allQuestions = await Question.find(filter);
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      questions = shuffled.slice(0, Number(limit));
    } else {
      // Get paginated questions
      questions = await Question.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));
    }
    
    const total = await Question.countDocuments(filter);
    
    res.json({
      questions,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit answer and get scoring
exports.submitAnswer = async (req, res) => {
  try {
    const { user_id, question_id, user_answer } = req.body;
    
    const question = await Question.findById(question_id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    
    // Determine result
    let result = false;
    if (question.question_type === '选择题') {
      // Auto scoring for multiple choice
      result = user_answer === question.answer;
    } else {
      // Mark as pending for manual scoring
      result = false; // Will be updated by teacher
    }
    
    // Create practice record
    const record = new PracticeRecord({
      user_id,
      question_id,
      result,
      user_answer
    });
    
    await record.save();
    
    res.json({
      record,
      correct_answer: question.answer,
      analysis: question.analysis
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get error book
exports.getErrorBook = async (req, res) => {
  try {
    const { user_id, subject, question_type, status = 'all' } = req.query;
    
    const filter = { user_id, result: false };
    
    // Get error records
    const records = await PracticeRecord.find(filter).populate('question_id');
    
    // Filter by subject and type
    let filteredRecords = records;
    if (subject) {
      filteredRecords = filteredRecords.filter(record => record.question_id.subject === subject);
    }
    if (question_type) {
      filteredRecords = filteredRecords.filter(record => record.question_id.question_type === question_type);
    }
    
    res.json(filteredRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark error as mastered
exports.markAsMastered = async (req, res) => {
  try {
    const { record_id } = req.body;
    
    // Update record status (in a real implementation, you might want to add a 'mastered' field)
    const record = await PracticeRecord.findById(record_id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    
    // For simplicity, we'll just mark it as correct
    record.result = true;
    await record.save();
    
    res.json({ message: 'Question marked as mastered', record });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};