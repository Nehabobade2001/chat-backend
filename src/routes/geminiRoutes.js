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



router.put('/:id', updateHistory);

// @route DELETE /api/gemini/:id
router.delete('/:id', deleteHistory);

module.exports = router;



