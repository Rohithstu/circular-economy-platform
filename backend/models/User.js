const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'both'],
    default: 'buyer'
  },
  // ✅ NEW: Enhanced profile fields
  profile: {
    bio: String,
    website: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    logo: String,
    banner: String
  },
  stats: {
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    totalListings: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    memberSince: { type: Date, default: Date.now }
  },
  verification: {
    isVerified: { type: Boolean, default: false },
    documents: [{
      type: String, // URL to uploaded document
      documentType: String
    }]
  },
  socialLinks: {
    website: String,
    linkedin: String,
    twitter: String
  },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

// ... existing methods
module.exports = mongoose.model('User', userSchema);