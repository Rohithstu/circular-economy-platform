const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ ✅ ✅ IMPORT ALL ROUTES ✅ ✅ ✅
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const materialRoutes = require('./routes/materialRoutes');
const favoriteRoutes = require('./routes/favorites');
const uploadRoutes = require('./routes/upload');
const paymentRoutes = require('./routes/payments');

// ✅ ✅ ✅ MOUNT ALL ROUTES ✅ ✅ ✅
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payments', paymentRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.json({
    message: '🌱 EcoTrade Circular Economy Platform API',
    version: '1.0.0',
    status: 'Running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      materials: '/api/materials',
      favorites: '/api/favorites',
      upload: '/api/upload',
      payments: '/api/payments'
    }
  });
});

// ✅ Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '✅ API is working!',
    timestamp: new Date().toISOString(),
    features: {
      authentication: true,
      userProfiles: true,
      materials: true,
      favorites: true,
      imageUpload: true,
      payments: true,
      profilePictures: true
    }
  });
});

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// ✅ Profile picture test endpoint
app.get('/api/profile-picture-test', (req, res) => {
  res.json({
    message: 'Profile picture endpoints are available',
    endpoints: {
      getProfile: 'GET /api/users/profile',
      updateProfile: 'PUT /api/users/profile',
      updatePicture: 'PUT /api/users/profile/picture'
    },
    limits: {
      imageSize: '5MB',
      supportedFormats: 'All image types'
    }
  });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// ✅ 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login'],
      users: ['GET /api/users/profile', 'PUT /api/users/profile', 'PUT /api/users/profile/picture'],
      materials: ['GET /api/materials', 'POST /api/materials', 'GET /api/materials/my-materials'],
      favorites: ['GET /api/favorites', 'POST /api/favorites', 'DELETE /api/favorites/:materialId']
    }
  });
});

// ✅ MongoDB connection with improved error handling
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecotrade';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📍 Database: ${mongoose.connection.name}`);
  console.log(`📍 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('💡 Tips:');
  console.log('   - Make sure MongoDB is running');
  console.log('   - Check your MONGO_URI in .env file');
  console.log('   - Try: mongod --dbpath ./data/db (if using local MongoDB)');
  process.exit(1);
});

// ✅ MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('📊 MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB connection disconnected');
});

// ✅ Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});

// ✅ ONLY ONE PORT DECLARATION ✅
const PORT = process.env.PORT || 5002;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log('📍 Access URLs:');
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Network: http://${getIPAddress()}:${PORT}`);
  console.log('\n📍 Available endpoints:');
  console.log('   GET  http://localhost:5002/');
  console.log('   GET  http://localhost:5002/api/test');
  console.log('   GET  http://localhost:5002/api/health');
  console.log('   GET  http://localhost:5002/api/profile-picture-test');
  console.log('   POST http://localhost:5002/api/auth/register');
  console.log('   POST http://localhost:5002/api/auth/login');
  console.log('   GET  http://localhost:5002/api/users/profile');
  console.log('   PUT  http://localhost:5002/api/users/profile');
  console.log('   PUT  http://localhost:5002/api/users/profile/picture');
  console.log('   GET  http://localhost:5002/api/materials');
  console.log('   POST http://localhost:5002/api/materials');
  console.log('   GET  http://localhost:5002/api/favorites');
  console.log('   POST http://localhost:5002/api/favorites');
  console.log('   POST http://localhost:5002/api/upload/image');
  console.log('   POST http://localhost:5002/api/payments/create-payment-intent');
  console.log('');
  console.log('✅ All premium features enabled:');
  console.log('   ✓ User Authentication & Authorization');
  console.log('   ✓ User Profiles with Profile Pictures');
  console.log('   ✓ Material Listings & Marketplace');
  console.log('   ✓ Favorites System');
  console.log('   ✓ Image Upload & Storage');
  console.log('   ✓ Payment System Integration');
  console.log('   ✓ Role-based Access Control');
  console.log('   ✓ Eco Impact Analytics');
  console.log('');
  console.log('🌱 EcoTrade Circular Economy Platform - Ready for sustainable trading!');
});

// ✅ Function to get local IP address
function getIPAddress() {
  const interfaces = require('os').networkInterfaces();
  for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (const address of addresses) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return 'localhost';
}

// ✅ Export for testing
module.exports = app;