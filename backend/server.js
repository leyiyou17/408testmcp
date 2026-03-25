const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const mockExamRoutes = require('./routes/mockExamRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/408exam', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mock-exams', mockExamRoutes);
app.use('/api/student', studentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});