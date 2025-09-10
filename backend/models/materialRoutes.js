const express = require('express');
const router = express.Router();
const Material = require('../models/Material');

router.get('/materials', async (req, res) => {
    try {
        const materials = await Material.find();
        res.json(materials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/materials', async (req, res) => {
    const { name, description, quantity, unit, listedBy } = req.body;
    try {
        const material = new Material({ name, description, quantity, unit, listedBy });
        await material.save();
        res.status(201).json(material);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
