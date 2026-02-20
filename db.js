const mongoose = require('mongoose')

const URI = 'mongodb+srv://customcake_db_user:LQJrkga3KJ96Q6Zg@customise-cake.5e9d3n1.mongodb.net/?appName=customise-cake'

mongoose.set("strictQuery", false);
const connectToDB = () => mongoose.connect(URI)

const connectToMongo = async () => {
  try {
    await connectToDB();
    console.log("Connected to Mongo Successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
};


module.exports = connectToMongo