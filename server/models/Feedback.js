import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    user_input: { type: String, required: true },
    feedback: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', feedbackSchema);
