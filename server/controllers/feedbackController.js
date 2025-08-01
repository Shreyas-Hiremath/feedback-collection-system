const Feedback = require('../models/Feedback');

exports.getAllFeedback = async (req, res) => {
  try {
    // Find all feedback and populate the 'formId' field to get the form's title
    const feedbackList = await Feedback.find().sort({ createdAt: -1 }).populate('formId', 'title');
    res.json(feedbackList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.submitFeedback = async (req, res) => {
  const { formId, answers } = req.body;
  try {
    const newFeedback = new Feedback({
      formId,
      answers,
    });
    await newFeedback.save();
    res.status(201).json({ msg: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};