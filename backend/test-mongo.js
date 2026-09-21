require('dotenv').config();

const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');

// Fix the connection string
let mongoUri = process.env.MONGO_URI;
if (mongoUri.includes('%40')) {
    mongoUri = mongoUri.replace('%40', '@');
    console.log('Fixed URI:', mongoUri);
}

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ SUCCESS: MongoDB connected!');
    console.log('Your credentials are working correctly.');
    process.exit(0);
})
.catch((error) => {
    console.error('❌ FAILED: MongoDB connection error:');
    console.error('Error message:', error.message);
    console.error('');
    console.error('Please check:');
    console.error('1. Your MongoDB Atlas username and password');
    console.error('2. Your IP is whitelisted in MongoDB Atlas');
    console.error('3. Your cluster is running (not paused)');
    console.error('4. You have a database user created in MongoDB Atlas');
    process.exit(1);
});