import Feedback from '../models/Feedback.js';
import { generateFeedback } from '../utils/geminiClient.js';

export const createFeedback = async (req, res) => {
  const { user_input } = req.body;

  // Validation
  if (!user_input || typeof user_input !== 'string' || user_input.trim() === '') {
    return res.status(400).json({ error: 'Invalid user input. Please provide a non-empty string.' });
  }

  try {
    const newFeedback = new Feedback({ user_input: user_input.trim(), feedback: 'Pending AI response...' });
    const savedDoc = await newFeedback.save();

    const aiFeedback = await generateFeedback(user_input);

    savedDoc.feedback = aiFeedback.trim();
    const updatedDoc = await savedDoc.save();

    res.status(200).json(updatedDoc);
  } catch (err) {
    console.error('Controller error:', err.message);
    res.status(500).json({ error: 'Failed to generate or update feedback' });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const allFeedback = await Feedback.find().sort({ timestamp: -1 });
    res.status(200).json(allFeedback);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};
