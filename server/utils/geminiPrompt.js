export const generatePrompt = (user_input) => {
  return `
You are a helpful and friendly AI language assistant.

The user wrote:
"${user_input}"

Return only 2–3 **very short** bullet points of feedback.
- Keep it under 15 words per point.
- Focus on spelling, grammar, clarity, or goal improvement.
- Do not explain or rephrase the whole message.
- Be kind and supportive.
`;
};
