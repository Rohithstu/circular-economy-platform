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

// ✅ ✅ ✅ IMPORT ALL ROUTES ✅ ✅ ✅
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const materialRoutes = require('./routes/materialRoutes');
const favoriteRoutes = require('./routes/favorites'); // NEW - Favorites system
const uploadRoutes = require('./routes/upload');      // NEW - Image upload
const paymentRoutes = require('./routes/payments');   // NEW - Payment system

// ✅ ✅ ✅ MOUNT ALL ROUTES ✅ ✅ ✅
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/favorites', favoriteRoutes);    // NEW
app.use('/api/upload', uploadRoutes);         // NEW  
app.use('/api/payments', paymentRoutes);      // NEW

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    features: {
      authentication: true,
      materials: true,
      favorites: true,
      imageUpload: true,
      payments: true,
      userProfiles: true
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecotrade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('⚠️ MongoDB connection warning:', err.message));

// ✅ ONLY ONE PORT DECLARATION ✅
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📍 Available endpoints:');
  console.log('   GET  http://localhost:5002/api/test');
  console.log('   GET  http://localhost:5002/api/health');
  console.log('   POST http://localhost:5002/api/auth/register');
  console.log('   POST http://localhost:5002/api/auth/login');
  console.log('   GET  http://localhost:5002/api/materials');
  console.log('   POST http://localhost:5002/api/materials');
  console.log('   GET  http://localhost:5002/api/favorites');
  console.log('   POST http://localhost:5002/api/favorites');
  console.log('   POST http://localhost:5002/api/upload/image');
  console.log('   POST http://localhost:5002/api/payments/create-payment-intent');
  console.log('');
  console.log('✅ All premium features enabled:');
  console.log('   ✓ User Profiles & Ratings');
  console.log('   ✓ Favorites System');
  console.log('   ✓ Image Upload');
  console.log('   ✓ Payment System');
  console.log('   ✓ Role-based Access Control');
});