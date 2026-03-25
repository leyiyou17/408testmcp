const express = require('express');
const router = express.Router();
const mockExamController = require('../controllers/mockExamController');

// Mock exam routes
router.get('/', mockExamController.getMockExams);
router.get('/:id', mockExamController.getMockExam);
router.post('/', mockExamController.createMockExam);
router.get('/:id/analysis', mockExamController.getMockExamAnalysis);
router.post('/submit', mockExamController.submitMockExam);

module.exports = router;