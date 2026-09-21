require('dotenv').config();

const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

// In-memory database for testing and offline demo
let materials = [
  {
    id: 1,
    title: 'Recycled rPET Polymer Pellets (Bottle Grade)',
    description: 'Decontaminated, ultra-pure recycled polyethylene terephthalate (rPET) pellets. FDA/EFSA approved for food-grade packaging.',
    category: 'Plastic',
    quantity: 15,
    unit: 'tons',
    price: 850,
    isFree: false,
    location: 'Detroit, MI',
    company: 'Apex Polymer Circular Co.',
    carbonSavedKg: 18400,
    purity: '99.4% Virgin Grade',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526951521990-d70323f13387?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    distance: '14.2 mi'
  },
  {
    id: 2,
    title: 'Aviation 6061-T6 Aluminum Shavings & Offcuts',
    description: 'Clean aerospace grade aluminum extrusion offcuts and chips with zero zinc/iron contamination. Melt-ready for remanufacturing.',
    category: 'Metal',
    quantity: 8,
    unit: 'tons',
    price: 1420,
    isFree: false,
    location: 'Wichita, KS',
    company: 'AeroMetals Closed Loop',
    carbonSavedKg: 28500,
    purity: '99.8% Aluminum',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    distance: '32.1 mi'
  },
  {
    id: 3,
    title: 'Standard Heat-Treated EPAL Wood Pallets',
    description: 'ISPM-15 certified 4-way heavy duty industrial euro pallets. Clean, stored in dry warehouse, ready for redistribution.',
    category: 'Wood',
    quantity: 450,
    unit: 'pallets',
    price: 0,
    isFree: true,
    location: 'San Francisco, CA',
    company: 'EcoLogistics Hub',
    carbonSavedKg: 3600,
    purity: 'Dry Kiln Certified',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    distance: '5.4 mi'
  },
  {
    id: 4,
    title: 'Post-Industrial Clean Cullet (Flint Glass)',
    description: 'Crushed furnace-ready clear bottle glass cullet, sorted with optical NIR sorters. Granule size 5mm - 25mm.',
    category: 'Glass',
    quantity: 40,
    unit: 'tons',
    price: 65,
    isFree: false,
    location: 'Pittsburgh, PA',
    company: 'Verde Glass Recyclers',
    carbonSavedKg: 12400,
    purity: '99.1% Flint',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    distance: '18.9 mi'
  },
  {
    id: 5,
    title: 'Decommissioned Server Racks & PCB Scrap',
    description: 'Data center telecom boards, server motherboards with gold/copper plating intact. R2v3 certified downstream chain of custody.',
    category: 'E-Waste',
    quantity: 1200,
    unit: 'kg',
    price: 3200,
    isFree: false,
    location: 'Austin, TX',
    company: 'Silicon Cycle Labs',
    carbonSavedKg: 9100,
    purity: 'R2v3 Certified',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    distance: '22.0 mi'
  },
  {
    id: 6,
    title: 'Organic Denim Offcuts & Cotton Fiber Yarn',
    description: 'Pre-consumer 100% GOTS organic cotton garment cutting room surplus. Shredded fiber suitable for non-woven insulation or textile yarn spinning.',
    category: 'Textiles',
    quantity: 3500,
    unit: 'kg',
    price: 180,
    isFree: false,
    location: 'Greensboro, NC',
    company: 'ReWeave Fibers Corp',
    carbonSavedKg: 5200,
    purity: '100% Organic Cotton',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    distance: '11.5 mi'
  },
  {
    id: 7,
    title: 'HDPE Natural Regrind Flakes',
    description: 'Washed and granulate natural high-density polyethylene flakes derived from clean IBC totes and packaging drums.',
    category: 'Plastic',
    quantity: 12,
    unit: 'tons',
    price: 720,
    isFree: false,
    location: 'Chicago, IL',
    company: 'Midwest Polymer Reclamation',
    carbonSavedKg: 14800,
    purity: '98.9% HDPE',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    distance: '8.3 mi'
  },
  {
    id: 8,
    title: 'Reclaimed Kiln-Dried Pine & Douglas Fir Timbers',
    description: 'Deconstructed warehouse structural beams. De-nailed, metal-detected, and surface planed for architectural reuse.',
    category: 'Wood',
    quantity: 80,
    unit: 'units',
    price: 45,
    isFree: false,
    location: 'Portland, OR',
    company: 'TimberCycle Northwest',
    carbonSavedKg: 4200,
    purity: 'FSC Reclaimed',
    image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    distance: '16.7 mi'
  }
];

// Mock Users for Auth
let users = [
  {
    id: 'user_1',
    name: 'Alex Vance',
    email: 'procurement@greentech-mfg.com',
    company: 'GreenTech Manufacturing Ltd',
    role: 'buyer',
    password: 'password123',
    token: 'jwt_mock_buyer_token_2026'
  },
  {
    id: 'user_2',
    name: 'Sarah Chen',
    email: 'circular@novamaterials.com',
    company: 'Nova Recycled Materials Co.',
    role: 'seller',
    password: 'password123',
    token: 'jwt_mock_seller_token_2026'
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🌱 Circular Economy API (Local Live Mock Server)',
    status: 'OK',
    version: '2.0.0',
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
      material.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (price === 'free') {
    filteredMaterials = filteredMaterials.filter(material => material.isFree);
  } else if (price === 'paid') {
    filteredMaterials = filteredMaterials.filter(material => !material.isFree);
  }
  
  res.json({
    materials: filteredMaterials,
    total: filteredMaterials.length
  });
});

app.post('/api/materials', (req, res) => {
  const newMaterial = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date(),
    verified: true
  };
  materials.unshift(newMaterial);
  res.status(201).json(newMaterial);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const foundUser = users.find(u => u.email === email && u.password === password);
  if (foundUser) {
    return res.json({
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        company: foundUser.company,
        role: foundUser.role
      },
      token: foundUser.token
    });
  }
  // Generic success for any demo account for testing ease
  const genericUser = {
    id: 'user_' + Date.now(),
    name: email.split('@')[0],
    email: email,
    company: 'Circular Partner Ltd',
    role: 'both'
  };
  res.json({
    user: genericUser,
    token: 'jwt_mock_token_' + Date.now()
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, company, role, password } = req.body;
  const newUser = {
    id: 'user_' + Date.now(),
    name: name || 'Enterprise Partner',
    email,
    company: company || 'Enterprise Co',
    role: role || 'buyer',
    password: password || 'password123',
    token: 'jwt_mock_registered_' + Date.now()
  };
  users.push(newUser);
  res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      company: newUser.company,
      role: newUser.role
    },
    token: newUser.token
  });
});

app.get('/api/users/profile', (req, res) => {
  res.json(users[0]);
});

app.listen(PORT, () => {
  console.log(`\n🚀 CircularNet Local Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api/materials`);
  console.log('📝 Seeding rich 2026 industrial circular economy materials');
});