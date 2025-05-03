const axios = require('axios');
const GeminiHistory = require('../models/geminiModel');




exports.generateLandingPage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ success: false, error: 'Prompt is required.' });
  }

  try {
    // Enhance the prompt to request complete HTML, CSS, and JS
    const finalPrompt = `Create a professional, fully working landing page using complete HTML, CSS, and JavaScript. The page must include modern, clean design and functional JavaScript. ${prompt}`;

    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: finalPrompt }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!responseText) {
      return res.status(500).json({ success: false, error: 'No landing page generated.' });
    }

    // Optional: Save to database
    await GeminiHistory.create({ prompt, response: responseText });

    return res.status(201).json({ success: true, data: { prompt, response: responseText } });
  } catch (error) {
    console.error('Error generating landing page:', error.message);
    return res.status(500).json({ success: false, error: 'Failed to generate landing page.' });
  }
};




// GET: Fetch history by ID
exports.getHistoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const history = await GeminiHistory.findById(id);

    if (!history) {
      return res.status(404).json({ success: false, error: 'History not found.' });
    }

    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error('Error fetching history by ID:', error.message);
    return res.status(500).json({ success: false, error: 'Failed to fetch history.' });
  }
};




// GET: Fetch all history
exports.getHistory = async (req, res) => {
  try {
    const history = await GeminiHistory.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error('Error fetching history:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch history.' });
  }
};

// PUT: Update a prompt/response
exports.updateHistory = async (req, res) => {
  const { id } = req.params;
  const { prompt, response } = req.body;
  try {
    const updatedHistory = await GeminiHistory.findByIdAndUpdate(
      id,
      { prompt, response },
      { new: true, runValidators: true }
    );

    if (!updatedHistory) {
      return res.status(404).json({ success: false, error: 'History not found.' });
    }

    res.status(200).json({ success: true, data: updatedHistory });
  } catch (error) {
    console.error('Error updating history:', error.message);
    res.status(500).json({ success: false, error: 'Failed to update history.' });
  }
};

// DELETE: Delete a record
exports.deleteHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHistory = await GeminiHistory.findByIdAndDelete(id);

    if (!deletedHistory) {
      return res.status(404).json({ success: false, error: 'History not found.' });
    }

    res.status(200).json({ success: true, message: 'History deleted successfully.' });
  } catch (error) {
    console.error('Error deleting history:', error.message);
    res.status(500).json({ success: false, error: 'Failed to delete history.' });
  }
};





