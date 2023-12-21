const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;


const db = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to the database...");
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = db;