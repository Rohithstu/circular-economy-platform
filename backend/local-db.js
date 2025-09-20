require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory database for testing
let materials = [
    {
        id: 1,
        title: 'Industrial Wood Pallets',
        description: 'Good condition wood pallets from our warehouse',
        category: 'Wood',
        quantity: 120,
        unit: 'pallets',
        price: 0,
        isFree: true,
        location: 'San Francisco, CA',
        company: 'EcoWood Industries',
        distance: '2.3'
    },
    {
        id: 2,
        title: 'Plastic Packaging Materials',
        description: 'Clean plastic packaging materials available for reuse',
        category: 'Plastic',
        quantity: 500,
        unit: 'kg',
        price: 45,
        isFree: false,
        location: 'Oakland, CA',
        company: 'GreenPack Solutions',
        distance: '8.7'
    }
];

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Circular Economy API (Local Mode)',
        status: 'OK',
        database: 'in-memory'
    });
});

app.get('/api/materials', (req, res) => {
    const { search, category, price } = req.query;
    
    let filteredMaterials = [...materials];
    
    if (search) {
        filteredMaterials = filteredMaterials.filter(material =>
            material.title.toLowerCase().includes(search.toLowerCase()) ||
            material.description.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    if (category && category !== 'all') {
        filteredMaterials = filteredMaterials.filter(material =>
            material.category === category
        );
    }
    
    if (price === 'free') {
        filteredMaterials = filteredMaterials.filter(material => material.isFree);
    } else if (price === 'paid') {
        filteredMaterials = filteredMaterials.filter(material => !material.isFree);
    }
    
    res.json(filteredMaterials);
});

app.post('/api/materials', (req, res) => {
    const newMaterial = {
        id: materials.length + 1,
        ...req.body,
        createdAt: new Date()
    };
    materials.push(newMaterial);
    res.status(201).json(newMaterial);
});

app.listen(PORT, () => {
    console.log(`🚀 Local server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}`);
    console.log('📝 Using in-memory database (no MongoDB required)');
});