/**
 * TalentPulse AI — MongoDB Atlas Cloud Connection Manager
 * Handled by Atharva Teli (Database Lead)
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://AtharvaTeli:talentpulse.ai@cluster0.rek0ioo.mongodb.net/talentpulse_db?retryWrites=true&w=majority&appName=Cluster0";

    console.log('[Database] Connecting to MongoDB Atlas Cloud Cluster...');
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 8000
    });

    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`[Database] Active Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
