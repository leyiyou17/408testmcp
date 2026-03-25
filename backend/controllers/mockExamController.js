const MockExam = require('../models/mockExam');
const MockExamRecord = require('../models/mockExamRecord');
const Question = require('../models/question');

// Get all mock exams
exports.getMockExams = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const exams = await MockExam.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    
    const total = await MockExam.countDocuments();
    
    res.json({
      exams,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single mock exam
exports.getMockExam = async (req, res) => {
  try {
    const exam = await MockExam.findById(req.params.id).populate('questions');
    if (!exam) return res.status(404).json({ error: 'Mock exam not found' });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new mock exam
exports.createMockExam = async (req, res) => {
  try {
    const { title, start_time, end_time, subject_scope, question_rule, questions } = req.body;
    
    // Validate time conflict
    const conflictingExams = await MockExam.find({
      $or: [
        { start_time: { $lt: end_time }, end_time: { $gt: start_time } }
      ]
    });
    
    if (conflictingExams.length > 0) {
      return res.status(400).json({ error: 'Time conflict with existing exam' });
    }
    
    let examQuestions = [];
    
    if (questions && questions.length > 0) {
      // Manual question selection
      examQuestions = questions;
    } else {
      // Auto-assembly algorithm
      examQuestions = await autoAssembleQuestions(subject_scope, question_rule);
    }
    
    const exam = new MockExam({
      title,
      start_time,
      end_time,
      subject_scope,
      question_rule,
      questions: examQuestions
    });
    
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Auto-assemble questions based on rules
async function autoAssembleQuestions(subject_scope, question_rule) {
  const questions = [];
  
  for (const [subject, types] of Object.entries(subject_scope)) {
    for (const [type, count] of Object.entries(types)) {
      for (let i = 0; i < count; i++) {
        const question = await Question.findOne({
          subject,
          question_type: type,
          status: 1
        }).sort({ difficulty: 1 });
        
        if (question) {
          questions.push(question._id);
        }
      }
    }
  }
  
  return questions;
}

// Get mock exam analysis
exports.getMockExamAnalysis = async (req, res) => {
  try {
    const exam = await MockExam.findById(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Mock exam not found' });
    
    // Get exam records
    const records = await MockExamRecord.find({ exam_id: exam._id }).populate('user_id');
    
    // Calculate statistics
    const scores = records.map(record => record.score);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length || 0;
    const highestScore = Math.max(...scores) || 0;
    
    // Get question correctness
    const questionCorrectness = await getQuestionCorrectness(exam._id, exam.questions);
    
    res.json({
      exam,
      statistics: {
        totalParticipants: records.length,
        averageScore,
        highestScore,
        questionCorrectness
      },
      records
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get question correctness for an exam
async function getQuestionCorrectness(examId, questionIds) {
  const correctness = [];
  
  for (const questionId of questionIds) {
    const records = await MockExamRecord.find({ exam_id: examId });
    let correctCount = 0;
    
    for (const record of records) {
      if (record.answers[questionId] === await getQuestionAnswer(questionId)) {
        correctCount++;
      }
    }
    
    correctness.push({
      questionId,
      correctCount,
      totalCount: records.length,
      correctnessRate: records.length > 0 ? (correctCount / records.length) * 100 : 0
    });
  }
  
  return correctness;
}

// Get question answer
async function getQuestionAnswer(questionId) {
  const question = await Question.findById(questionId);
  return question ? question.answer : '';
}

// Submit mock exam
exports.submitMockExam = async (req, res) => {
  try {
    const { user_id, exam_id, answers } = req.body;
    
    // Calculate score
    let score = 0;
    const exam = await MockExam.findById(exam_id);
    
    for (const [questionId, userAnswer] of Object.entries(answers)) {
      const question = await Question.findById(questionId);
      if (question && userAnswer === question.answer) {
        score += 10; // Assuming each question is worth 10 points
      }
    }
    
    // Calculate rank
    const records = await MockExamRecord.find({ exam_id }).sort({ score: -1 });
    let rank = records.length + 1;
    
    for (let i = 0; i < records.length; i++) {
      if (score > records[i].score) {
        rank = i + 1;
        break;
      }
    }
    
    const record = new MockExamRecord({
      user_id,
      exam_id,
      score,
      rank,
      answers
    });
    
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};