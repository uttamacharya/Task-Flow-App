// controllers/aiController.js
const axios = require("axios");

const getAISuggestion = async (req, res) => {
  try {
    const { taskId, logText } = req.body;
    const userId = req.user.id; // auth middleware se aayega

    if (!taskId || !logText) {
      return res.status(400).json({ success: false, message: "TaskId and logText required" });
    }

    // Gemini API call
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText",
      {
        prompt: `You are a helpful coding and task assistant.\nTask: ${taskId}\nLog/Query: ${logText}\nGive suggestions.`,
        temperature: 0.7,
        maxOutputTokens: 200
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}` // Gemini API key
        }
      }
    );

    // Gemini response parsing
    const suggestion = response.data.candidates[0].content;

    res.status(200).json({ success: true, suggestion });
  } catch (err) {
    console.error(" Gemini AI ERROR:", err.response?.data || err.message);
    res.status(500).json({ success: false, message: "AI request failed" });
  }
};

module.exports = { getAISuggestion };
