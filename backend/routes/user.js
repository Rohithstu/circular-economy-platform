const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -verification.documents')
      .populate('stats');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user stats
router.get('/:id/stats', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('stats');
    res.json(user.stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;