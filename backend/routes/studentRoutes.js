const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student routes
router.get('/subjects', studentController.getSubjects);
router.get('/questions', studentController.getQuestionsBySubject);
router.post('/submit', studentController.submitAnswer);
router.get('/error-book', studentController.getErrorBook);
router.post('/mark-mastered', studentController.markAsMastered);

module.exports = router;