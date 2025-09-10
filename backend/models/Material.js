const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    available: { type: Boolean, default: true },
    listedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Material', materialSchema);
