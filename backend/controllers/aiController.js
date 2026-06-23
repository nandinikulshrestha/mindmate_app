/*const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});
                     
const chatWithAI = async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required"
      });
    }

    const prompt = `
You are a helpful mental wellness assistant.

Rules:
- Be supportive and empathetic.
- Give practical advice.
- Keep responses short.
- Never judge the user.

User Message:
${message}
`;

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    return res.status(200).json({
      reply
    });

  } catch (error) {

    console.error("Gemini Error:", error.message);

    // Fallback response if Gemini fails
    return res.status(200).json({
      reply:
        "I understand you're going through a difficult time. Try taking a short break, drinking water, and focusing on one small task at a time."
    });

  }
};

module.exports = {
  chatWithAI
};*/
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    let reply = "";

    const text = message.toLowerCase();

    if (
      text.includes("sad") ||
      text.includes("depressed") ||
      text.includes("lonely")
    ) {
      reply =
        "I'm sorry you're feeling this way. Talking with a trusted friend or family member can help. Would you like to tell me more?";
    } else if (
      text.includes("stress") ||
      text.includes("exam") ||
      text.includes("pressure")
    ) {
      reply =
        "Exam stress is common. Try dividing your work into smaller tasks and take short breaks while studying.";
    } else if (
      text.includes("angry") ||
      text.includes("anger")
    ) {
      reply =
        "When feeling angry, try deep breathing and take a few minutes away from the situation before reacting.";
    } else if (
      text.includes("happy") ||
      text.includes("excited")
    ) {
      reply =
        "That's great to hear! Keep doing activities that make you feel positive and motivated.";
    } else if (
      text.includes("anxiety") ||
      text.includes("anxious")
    ) {
      reply =
        "Anxiety can feel overwhelming. Try focusing on your breathing and one task at a time.";
    } else {
      reply =
        "Thank you for sharing that with me. Can you tell me a little more about how you're feeling today?";
    }

    res.json({ reply });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      reply: "Something went wrong.",
    });
  }
};

module.exports = { chatWithAI };