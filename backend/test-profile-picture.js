const mongoose = require('mongoose');
require('dotenv').config();

async function testUserModel() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecotrade');
    console.log('Connected to MongoDB');
    
    const User = require('./models/User');
    
    // Check if profilePicture field exists in schema
    const userSchema = User.schema;
    console.log('User schema fields:', Object.keys(userSchema.paths));
    
    // Check if profilePicture field exists
    if (userSchema.paths.profilePicture) {
      console.log('✓ profilePicture field exists in User model');
    } else {
      console.log('✗ profilePicture field missing in User model');
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

testUserModel();