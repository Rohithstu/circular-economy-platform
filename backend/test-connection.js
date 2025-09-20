require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('Connection string:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:');
        console.error('Error message:', err.message);
        console.error('Error code:', err.code);
        process.exit(1);
    });