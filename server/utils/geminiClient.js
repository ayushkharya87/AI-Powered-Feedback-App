// utils/geminiClient.js

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generatePrompt } from './geminiPrompt.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateFeedback = async (user_input) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(generatePrompt(user_input));
    const response = await result.response;
    const text = response.text();

    return text || 'AI did not return any feedback.';
  } catch (error) {
    return 'AI feedback generation failed.';
  }
};
