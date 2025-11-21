const express = require('express');
const router = express.Router();
// Require the feedback model from the `Models` directory (match capitalization)
const Feedback = require('../Models/feedback');

// GET all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error while fetching feedback' });
  }
});

// POST new feedback
router.post('/', async (req, res) => {
  const { name, feedback } = req.body;

  if (!name || !feedback) {
    return res.status(400).json({ error: 'Name and feedback are required' });
  }

  try {
    const newFeedback = new Feedback({ name, feedback });
    await newFeedback.save();

    res.status(201).json({
      message: 'Feedback submitted successfully!',
      feedback: newFeedback
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error while saving feedback' });
  }
});

module.exports = router;
