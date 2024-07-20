const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`database connected: ${conn.connection.host}`);
    console.log(`Using database: ${conn.connection.db.databaseName}`);
  } catch (error) {
    console.log("database not connected..");
    console.error(error);
  }
};

module.exports = connectDB;
