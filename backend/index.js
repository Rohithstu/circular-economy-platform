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

// ✅ ✅ ✅ CRITICAL: ADD THESE MISSING LINES ✅ ✅ ✅
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const materialRoutes = require('./routes/materialRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/materials', materialRoutes);
// ✅ ✅ ✅ END OF MISSING LINES ✅ ✅ ✅

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('⚠️ MongoDB connection warning:', err.message));

// ✅ ✅✅ ONLY ONE PORT DECLARATION ✅✅✅
const PORT = process.env.PORT || 5002; // Changed to 5002 to avoid conflict

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📍 Test these endpoints:');
  console.log('   GET  http://localhost:5002/api/test'); // Changed to 5002
  console.log('   POST http://localhost:5002/api/auth/register'); // Changed to 5002
});