const mongoose = require('mongoose');

const URI = 'mongodb+srv://customcake_db_user:LQJrkga3KJ96Q6Zg@customise-cake.5e9d3n1.mongodb.net/?appName=customise-cake';

const connectToMongo = async () => {
  try {
    await mongoose.connect(URI, {  family: 4});
    console.log("✅ Connected to Mongo Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;


