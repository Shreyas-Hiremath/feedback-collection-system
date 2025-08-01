// server/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
// Make sure to import both functions
const { getAllFeedback, submitFeedback } = require('../controllers/feedbackController');

// Get all feedback
router.get('/', getAllFeedback);

// Add this route to handle submissions
router.post('/', submitFeedback);

module.exports = router;