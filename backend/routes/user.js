const express = require('express');
const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    res.json({ message: 'User route works!', userId: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    res.json({ message: 'User update route works!', userId: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;