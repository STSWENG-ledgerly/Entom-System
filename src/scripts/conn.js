const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');

function connectToMongo() {
  const uri = `${process.env.MONGODB_URI.replace(/\/$/, '')}/${process.env.DB_NAME}`;
  console.log("Connecting to:", uri);
  
  if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
    throw new Error("Missing MONGODB_URI or DB_NAME in .env");
  }

  return mongoose.connect(uri, {
    
  });
}

function signalHandler() {
  console.log("Database: Closing MongoDB connection...");
  mongoose.disconnect().then(() => {
    process.exit();
  }).catch(error => {
    console.error('Database: Error disconnecting from MongoDB', error);
    process.exit(1);
  });
}

process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);

module.exports = connectToMongo;
