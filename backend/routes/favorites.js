const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const { protect } = require('../middleware/auth');

// Add to favorites
router.post('/', protect, async (req, res) => {
  try {
    const favorite = new Favorite({
      user: req.user.id,
      material: req.body.materialId
    });
    
    await favorite.save();
    await favorite.populate('material');
    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove from favorites
router.delete('/:materialId', protect, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      user: req.user.id,
      material: req.params.materialId
    });
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user favorites
router.get('/', protect, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id })
      .populate('material')
      .sort({ createdAt: -1 });
    
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;