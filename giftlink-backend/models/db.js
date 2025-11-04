require('dotenv').config({ path: '../.env' }); // adjust path if needed
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/giftdb';
    console.log('Connecting to MongoDB at:', mongoURI);

    // Mongoose 7+ ignores useNewUrlParser/useUnifiedTopology
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1); // stop the server if DB connection fails
  }
};

module.exports = connectDB;
