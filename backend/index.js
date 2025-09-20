require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Debug: Check environment variables
console.log('Environment check:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

// Fix MongoDB connection string - remove URL encoding
let mongoUri = process.env.MONGO_URI;
if (mongoUri && mongoUri.includes('%40')) {
    mongoUri = mongoUri.replace('%40', '@');
    console.log('Fixed MongoDB URI (removed URL encoding)');
}

// Connect to MongoDB with better error handling
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB connected successfully');
})
.catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('Please check your MongoDB credentials and connection string');
});

// Simple test routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Circular Economy API is running',
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
        status: 'OK', 
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});

// Simple materials route for testing
app.get('/api/materials', (req, res) => {
    res.json([
        {
            id: 1,
            title: 'Test Material',
            description: 'This is a test material',
            category: 'Wood',
            quantity: 100,
            unit: 'kg',
            price: 0,
            isFree: true,
            location: 'Test Location',
            company: 'Test Company'
        }
    ]);
});

// Error handling middleware - SIMPLIFIED
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler - SIMPLIFIED
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}`);
});