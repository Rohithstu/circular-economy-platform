const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const { protect } = require('../middleware/auth'); // Import auth middleware

// Get all materials with filters
router.get('/', async (req, res) => {
    try {
        const { search, category, price, page = 1, limit = 10 } = req.query;
        let query = { available: true };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category && category !== 'all') {
            query.category = category;
        }

        if (price === 'free') {
            query.isFree = true;
        } else if (price === 'paid') {
            query.isFree = false;
        }

        const materials = await Material.find(query)
            .populate('userId', 'name company')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Material.countDocuments(query);

        res.json({
            materials,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single material
router.get('/:id', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id).populate('userId', 'name company');
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create material - PROTECTED ROUTE
router.post('/', protect, async (req, res) => {
    try {
        // ✅ Check if user is seller or both
        if (req.user.role !== 'seller' && req.user.role !== 'both') {
            return res.status(403).json({ 
                error: 'Access denied. Only sellers can list materials.' 
            });
        }

        const material = new Material({
            ...req.body,
            userId: req.user.id // Set the user ID from auth middleware
        });
        
        await material.save();
        await material.populate('userId', 'name company');
        res.status(201).json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update material - PROTECTED ROUTE
router.put('/:id', protect, async (req, res) => {
    try {
        const material = await Material.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('userId', 'name company');

        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        res.json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete material - PROTECTED ROUTE
router.delete('/:id', protect, async (req, res) => {
    try {
        const material = await Material.findByIdAndDelete(req.params.id);
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.json({ message: 'Material deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;