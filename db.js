const mongoose = require('mongoose')

const URI = 'mongodb+srv://customcake_db_user:LQJrkga3KJ96Q6Zg@customise-cake.5e9d3n1.mongodb.net/?appName=customise-cake'


const connectToMongo = () => mongoose.connect(URI, () => {
  
    console.log("Connected to Mongo Successfully");
 })



module.exports = connectToMongo