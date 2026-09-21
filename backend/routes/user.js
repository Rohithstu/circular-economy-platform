const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Get current user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -verification.documents');
    
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
    const allowedUpdates = ['name', 'email', 'company', 'profilePicture', 'profile', 'socialLinks', 'preferences'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update profile picture only
router.put('/profile/picture', protect, async (req, res) => {
  try {
    const { profilePicture } = req.body;
    
    if (!profilePicture) {
      return res.status(400).json({ error: 'Profile picture is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
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