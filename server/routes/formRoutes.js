const express = require('express');
const router = express.Router();
const { createForm, getAllForms, getFormById } = require('../controllers/formController');
const { auth, admin } = require('../middleware/authMiddleware');

// @route   POST /api/forms
// @desc    Admin can create a form
router.post('/', [auth, admin], createForm);

// @route   GET /api/forms
// @desc    Logged-in user can get all forms
router.get('/', auth, getAllForms);

// @route   GET /api/forms/:id
// @desc    Logged-in user can get a single form
router.get('/:id', auth, getFormById);

module.exports = router;