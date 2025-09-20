const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['Wood', 'Plastic', 'Metal', 'Paper', 'Textile', 'Electronic', 'Other']
    },
    quantity: { type: Number, required: true },
    unit: { 
        type: String, 
        required: true,
        enum: ['kg', 'lbs', 'pallets', 'boxes', 'units', 'other']
    },
    price: { type: Number, default: 0 },
    isFree: { type: Boolean, default: false },
    location: { type: String, required: true },
    image: { type: String, default: '' },
    company: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    available: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Material', materialSchema);