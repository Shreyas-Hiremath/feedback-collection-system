const Form = require('../models/Form');

/**
 * @desc    Create a new form
 * @route   POST /api/forms
 * @access  Private/Admin
 */
exports.createForm = async (req, res) => {
  const { title, description, questions } = req.body;
  try {
    const newForm = new Form({
      title,
      description,
      questions,
      createdBy: req.user.id,
    });
    const form = await newForm.save();
    res.status(201).json(form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Get all forms
 * @route   GET /api/forms
 * @access  Private
 */
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @desc    Get a single form by ID
 * @route   GET /api/forms/:id
 * @access  Private
 */
exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ msg: 'Form not found' });
    }
    res.json(form);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Form not found' });
    }
    res.status(500).send('Server Error');
  }
};