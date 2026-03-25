const Question = require('../models/question');

// Get all questions with pagination and filtering
exports.getQuestions = async (req, res) => {
  try {
    const { page = 1, limit = 10, subject, question_type, difficulty } = req.query;
    
    const filter = {};
    if (subject) filter.subject = subject;
    if (question_type) filter.question_type = question_type;
    if (difficulty) filter.difficulty = difficulty;
    
    const questions = await Question.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    
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

// Get a single question by ID
exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Batch import questions
exports.importQuestions = async (req, res) => {
  try {
    const { questions } = req.body;
    
    // Validate questions format
    for (const question of questions) {
      if (!question.content || !question.answer || !question.subject || !question.question_type || !question.difficulty) {
        return res.status(400).json({ error: 'Invalid question format' });
      }
    }
    
    // Import questions
    const importedQuestions = await Question.insertMany(questions);
    res.json({ message: 'Questions imported successfully', count: importedQuestions.length });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};