const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// ✅ SIMPLE TEST ROUTE FIRST
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// ✅ SIMPLE AUTH ROUTES (add these directly)
app.post('/api/auth/register', async (req, res) => {
  console.log('Register request received:', req.body);
  res.json({ 
    message: 'Register successful!', 
    user: {
      id: 'test123',
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      role: req.body.role
    },
    token: 'test-token-123'
  });
});

app.post('/api/auth/login', async (req, res) => {
  console.log('Login request received:', req.body);
  res.json({ 
    message: 'Login successful!',
    user: {
      id: 'test123',
      name: 'Test User',
      email: req.body.email,
      company: 'Test Company',
      role: 'buyer'
    },
    token: 'test-token-123'
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecotrade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Test routes available:`);
  console.log(`   GET  http://localhost:${PORT}/api/test`);
  console.log(`   POST http://localhost:${PORT}/api/auth/register`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
});