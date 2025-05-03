const express = require('express');
const router = express.Router();
const {
  getHistory,
  updateHistory,
  deleteHistory,
  generateLandingPage
} = require('../controllers/geminiController');

// @route POST /api/gemini
router.post('/', generateLandingPage);

// @route GET /api/gemini
router.get('/', getHistory);

//@route Get Id ke base pe
router.get('/:id', getHistoryById);
// @route PUT /api/gemini/:id
router.put('/:id', updateHistory);

// @route DELETE /api/gemini/:id
router.delete('/:id', deleteHistory);

module.exports = router;



